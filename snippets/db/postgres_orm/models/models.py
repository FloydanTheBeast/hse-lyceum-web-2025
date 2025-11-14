from typing import Any, Optional
import datetime
import decimal

from sqlalchemy import ARRAY, Boolean, CHAR, Column, Date, DateTime, Enum, ForeignKeyConstraint, INTEGER, Index, Integer, LargeBinary, Numeric, PrimaryKeyConstraint, SmallInteger, String, Table, Text, text
from sqlalchemy.dialects.postgresql import DOMAIN, TSVECTOR
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Actor(Base):
    __tablename__ = 'actor'
    __table_args__ = (
        PrimaryKeyConstraint('actor_id', name='actor_pkey'),
        Index('idx_actor_last_name', 'last_name')
    )

    actor_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    first_name: Mapped[str] = mapped_column(String(45), nullable=False)
    last_name: Mapped[str] = mapped_column(String(45), nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    film_actor: Mapped[list['FilmActor']] = relationship('FilmActor', back_populates='actor')


t_actor_info = Table(
    'actor_info', Base.metadata,
    Column('actor_id', Integer),
    Column('first_name', String(45)),
    Column('last_name', String(45)),
    Column('film_info', Text)
)


class Category(Base):
    __tablename__ = 'category'
    __table_args__ = (
        PrimaryKeyConstraint('category_id', name='category_pkey'),
    )

    category_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(25), nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    film_category: Mapped[list['FilmCategory']] = relationship('FilmCategory', back_populates='category')


class Country(Base):
    __tablename__ = 'country'
    __table_args__ = (
        PrimaryKeyConstraint('country_id', name='country_pkey'),
    )

    country_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    country: Mapped[str] = mapped_column(String(50), nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    city: Mapped[list['City']] = relationship('City', back_populates='country')


t_customer_list = Table(
    'customer_list', Base.metadata,
    Column('id', Integer),
    Column('name', Text),
    Column('address', String(50)),
    Column('zip code', String(10)),
    Column('phone', String(20)),
    Column('city', String(50)),
    Column('country', String(50)),
    Column('notes', Text),
    Column('sid', SmallInteger)
)


t_film_list = Table(
    'film_list', Base.metadata,
    Column('fid', Integer),
    Column('title', String(255)),
    Column('description', Text),
    Column('category', String(25)),
    Column('price', Numeric(4, 2)),
    Column('length', SmallInteger),
    Column('rating', Enum('G', 'PG', 'PG-13', 'R', 'NC-17', name='mpaa_rating')),
    Column('actors', Text)
)


class Language(Base):
    __tablename__ = 'language'
    __table_args__ = (
        PrimaryKeyConstraint('language_id', name='language_pkey'),
    )

    language_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(CHAR(20), nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    film: Mapped[list['Film']] = relationship('Film', back_populates='language')


t_nicer_but_slower_film_list = Table(
    'nicer_but_slower_film_list', Base.metadata,
    Column('fid', Integer),
    Column('title', String(255)),
    Column('description', Text),
    Column('category', String(25)),
    Column('price', Numeric(4, 2)),
    Column('length', SmallInteger),
    Column('rating', Enum('G', 'PG', 'PG-13', 'R', 'NC-17', name='mpaa_rating')),
    Column('actors', Text)
)


t_sales_by_film_category = Table(
    'sales_by_film_category', Base.metadata,
    Column('category', String(25)),
    Column('total_sales', Numeric)
)


t_sales_by_store = Table(
    'sales_by_store', Base.metadata,
    Column('store', Text),
    Column('manager', Text),
    Column('total_sales', Numeric)
)


t_staff_list = Table(
    'staff_list', Base.metadata,
    Column('id', Integer),
    Column('name', Text),
    Column('address', String(50)),
    Column('zip code', String(10)),
    Column('phone', String(20)),
    Column('city', String(50)),
    Column('country', String(50)),
    Column('sid', SmallInteger)
)


class City(Base):
    __tablename__ = 'city'
    __table_args__ = (
        ForeignKeyConstraint(['country_id'], ['country.country_id'], name='fk_city'),
        PrimaryKeyConstraint('city_id', name='city_pkey'),
        Index('idx_fk_country_id', 'country_id')
    )

    city_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    city: Mapped[str] = mapped_column(String(50), nullable=False)
    country_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    country: Mapped['Country'] = relationship('Country', back_populates='city')
    address: Mapped[list['Address']] = relationship('Address', back_populates='city')


class Film(Base):
    __tablename__ = 'film'
    __table_args__ = (
        ForeignKeyConstraint(['language_id'], ['language.language_id'], ondelete='RESTRICT', onupdate='CASCADE', name='film_language_id_fkey'),
        PrimaryKeyConstraint('film_id', name='film_pkey'),
        Index('film_fulltext_idx', 'fulltext'),
        Index('idx_fk_language_id', 'language_id'),
        Index('idx_title', 'title')
    )

    film_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    language_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    rental_duration: Mapped[int] = mapped_column(SmallInteger, nullable=False, server_default=text('3'))
    rental_rate: Mapped[decimal.Decimal] = mapped_column(Numeric(4, 2), nullable=False, server_default=text('4.99'))
    replacement_cost: Mapped[decimal.Decimal] = mapped_column(Numeric(5, 2), nullable=False, server_default=text('19.99'))
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))
    fulltext: Mapped[Any] = mapped_column(TSVECTOR, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    release_year: Mapped[Optional[int]] = mapped_column(DOMAIN('year', INTEGER(), constraint_name='year_check', not_null=False, check=text('VALUE >= 1901 AND VALUE <= 2155')))
    length: Mapped[Optional[int]] = mapped_column(SmallInteger)
    rating: Mapped[Optional[str]] = mapped_column(Enum('G', 'PG', 'PG-13', 'R', 'NC-17', name='mpaa_rating'), server_default=text("'G'::mpaa_rating"))
    special_features: Mapped[Optional[list[str]]] = mapped_column(ARRAY(Text()))

    language: Mapped['Language'] = relationship('Language', back_populates='film')
    film_actor: Mapped[list['FilmActor']] = relationship('FilmActor', back_populates='film')
    film_category: Mapped[list['FilmCategory']] = relationship('FilmCategory', back_populates='film')
    inventory: Mapped[list['Inventory']] = relationship('Inventory', back_populates='film')


class Address(Base):
    __tablename__ = 'address'
    __table_args__ = (
        ForeignKeyConstraint(['city_id'], ['city.city_id'], name='fk_address_city'),
        PrimaryKeyConstraint('address_id', name='address_pkey'),
        Index('idx_fk_city_id', 'city_id')
    )

    address_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    address: Mapped[str] = mapped_column(String(50), nullable=False)
    district: Mapped[str] = mapped_column(String(20), nullable=False)
    city_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))
    address2: Mapped[Optional[str]] = mapped_column(String(50))
    postal_code: Mapped[Optional[str]] = mapped_column(String(10))

    city: Mapped['City'] = relationship('City', back_populates='address')
    customer: Mapped[list['Customer']] = relationship('Customer', back_populates='address')
    staff: Mapped[list['Staff']] = relationship('Staff', back_populates='address')
    store: Mapped[list['Store']] = relationship('Store', back_populates='address')


class FilmActor(Base):
    __tablename__ = 'film_actor'
    __table_args__ = (
        ForeignKeyConstraint(['actor_id'], ['actor.actor_id'], ondelete='RESTRICT', onupdate='CASCADE', name='film_actor_actor_id_fkey'),
        ForeignKeyConstraint(['film_id'], ['film.film_id'], ondelete='RESTRICT', onupdate='CASCADE', name='film_actor_film_id_fkey'),
        PrimaryKeyConstraint('actor_id', 'film_id', name='film_actor_pkey'),
        Index('idx_fk_film_id', 'film_id')
    )

    actor_id: Mapped[int] = mapped_column(SmallInteger, primary_key=True)
    film_id: Mapped[int] = mapped_column(SmallInteger, primary_key=True)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    actor: Mapped['Actor'] = relationship('Actor', back_populates='film_actor')
    film: Mapped['Film'] = relationship('Film', back_populates='film_actor')


class FilmCategory(Base):
    __tablename__ = 'film_category'
    __table_args__ = (
        ForeignKeyConstraint(['category_id'], ['category.category_id'], ondelete='RESTRICT', onupdate='CASCADE', name='film_category_category_id_fkey'),
        ForeignKeyConstraint(['film_id'], ['film.film_id'], ondelete='RESTRICT', onupdate='CASCADE', name='film_category_film_id_fkey'),
        PrimaryKeyConstraint('film_id', 'category_id', name='film_category_pkey')
    )

    film_id: Mapped[int] = mapped_column(SmallInteger, primary_key=True)
    category_id: Mapped[int] = mapped_column(SmallInteger, primary_key=True)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    category: Mapped['Category'] = relationship('Category', back_populates='film_category')
    film: Mapped['Film'] = relationship('Film', back_populates='film_category')


class Inventory(Base):
    __tablename__ = 'inventory'
    __table_args__ = (
        ForeignKeyConstraint(['film_id'], ['film.film_id'], ondelete='RESTRICT', onupdate='CASCADE', name='inventory_film_id_fkey'),
        PrimaryKeyConstraint('inventory_id', name='inventory_pkey'),
        Index('idx_store_id_film_id', 'store_id', 'film_id')
    )

    inventory_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    film_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    store_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    film: Mapped['Film'] = relationship('Film', back_populates='inventory')
    rental: Mapped[list['Rental']] = relationship('Rental', back_populates='inventory')


class Customer(Base):
    __tablename__ = 'customer'
    __table_args__ = (
        ForeignKeyConstraint(['address_id'], ['address.address_id'], ondelete='RESTRICT', onupdate='CASCADE', name='customer_address_id_fkey'),
        PrimaryKeyConstraint('customer_id', name='customer_pkey'),
        Index('idx_fk_address_id', 'address_id'),
        Index('idx_fk_store_id', 'store_id'),
        Index('idx_last_name', 'last_name')
    )

    customer_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    store_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    first_name: Mapped[str] = mapped_column(String(45), nullable=False)
    last_name: Mapped[str] = mapped_column(String(45), nullable=False)
    address_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    activebool: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text('true'))
    create_date: Mapped[datetime.date] = mapped_column(Date, nullable=False, server_default=text("('now'::text)::date"))
    email: Mapped[Optional[str]] = mapped_column(String(50))
    last_update: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('now()'))
    active: Mapped[Optional[int]] = mapped_column(Integer)

    address: Mapped['Address'] = relationship('Address', back_populates='customer')
    rental: Mapped[list['Rental']] = relationship('Rental', back_populates='customer')
    payment: Mapped[list['Payment']] = relationship('Payment', back_populates='customer')


class Staff(Base):
    __tablename__ = 'staff'
    __table_args__ = (
        ForeignKeyConstraint(['address_id'], ['address.address_id'], ondelete='RESTRICT', onupdate='CASCADE', name='staff_address_id_fkey'),
        PrimaryKeyConstraint('staff_id', name='staff_pkey')
    )

    staff_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    first_name: Mapped[str] = mapped_column(String(45), nullable=False)
    last_name: Mapped[str] = mapped_column(String(45), nullable=False)
    address_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    store_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text('true'))
    username: Mapped[str] = mapped_column(String(16), nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))
    email: Mapped[Optional[str]] = mapped_column(String(50))
    password: Mapped[Optional[str]] = mapped_column(String(40))
    picture: Mapped[Optional[bytes]] = mapped_column(LargeBinary)

    address: Mapped['Address'] = relationship('Address', back_populates='staff')
    rental: Mapped[list['Rental']] = relationship('Rental', back_populates='staff')
    store: Mapped[list['Store']] = relationship('Store', back_populates='manager_staff')
    payment: Mapped[list['Payment']] = relationship('Payment', back_populates='staff')


class Rental(Base):
    __tablename__ = 'rental'
    __table_args__ = (
        ForeignKeyConstraint(['customer_id'], ['customer.customer_id'], ondelete='RESTRICT', onupdate='CASCADE', name='rental_customer_id_fkey'),
        ForeignKeyConstraint(['inventory_id'], ['inventory.inventory_id'], ondelete='RESTRICT', onupdate='CASCADE', name='rental_inventory_id_fkey'),
        ForeignKeyConstraint(['staff_id'], ['staff.staff_id'], name='rental_staff_id_key'),
        PrimaryKeyConstraint('rental_id', name='rental_pkey'),
        Index('idx_fk_inventory_id', 'inventory_id'),
        Index('idx_unq_rental_rental_date_inventory_id_customer_id', 'rental_date', 'inventory_id', 'customer_id', unique=True)
    )

    rental_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    rental_date: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False)
    inventory_id: Mapped[int] = mapped_column(Integer, nullable=False)
    customer_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    staff_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))
    return_date: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)

    customer: Mapped['Customer'] = relationship('Customer', back_populates='rental')
    inventory: Mapped['Inventory'] = relationship('Inventory', back_populates='rental')
    staff: Mapped['Staff'] = relationship('Staff', back_populates='rental')
    payment: Mapped[list['Payment']] = relationship('Payment', back_populates='rental')


class Store(Base):
    __tablename__ = 'store'
    __table_args__ = (
        ForeignKeyConstraint(['address_id'], ['address.address_id'], ondelete='RESTRICT', onupdate='CASCADE', name='store_address_id_fkey'),
        ForeignKeyConstraint(['manager_staff_id'], ['staff.staff_id'], ondelete='RESTRICT', onupdate='CASCADE', name='store_manager_staff_id_fkey'),
        PrimaryKeyConstraint('store_id', name='store_pkey'),
        Index('idx_unq_manager_staff_id', 'manager_staff_id', unique=True)
    )

    store_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    manager_staff_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    address_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    last_update: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('now()'))

    address: Mapped['Address'] = relationship('Address', back_populates='store')
    manager_staff: Mapped['Staff'] = relationship('Staff', back_populates='store')


class Payment(Base):
    __tablename__ = 'payment'
    __table_args__ = (
        ForeignKeyConstraint(['customer_id'], ['customer.customer_id'], ondelete='RESTRICT', onupdate='CASCADE', name='payment_customer_id_fkey'),
        ForeignKeyConstraint(['rental_id'], ['rental.rental_id'], ondelete='SET NULL', onupdate='CASCADE', name='payment_rental_id_fkey'),
        ForeignKeyConstraint(['staff_id'], ['staff.staff_id'], ondelete='RESTRICT', onupdate='CASCADE', name='payment_staff_id_fkey'),
        PrimaryKeyConstraint('payment_id', name='payment_pkey'),
        Index('idx_fk_customer_id', 'customer_id'),
        Index('idx_fk_rental_id', 'rental_id'),
        Index('idx_fk_staff_id', 'staff_id')
    )

    payment_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    customer_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    staff_id: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    rental_id: Mapped[int] = mapped_column(Integer, nullable=False)
    amount: Mapped[decimal.Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    payment_date: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False)

    customer: Mapped['Customer'] = relationship('Customer', back_populates='payment')
    rental: Mapped['Rental'] = relationship('Rental', back_populates='payment')
    staff: Mapped['Staff'] = relationship('Staff', back_populates='payment')
