import sys

if len(sys.argv) != 3:
    print('Введите ровно 2 IP адреса')

[_, ip_address1, ip_address2] = sys.argv

def validate_ip(ip: str) -> bool:
    parts = ip.split('.')

    if len(parts):
        exit('IP-адрес должен состоять ровно из 4-х частей')

    try:
        return all([int(p) > 0 and int(p) < 256 for p in parts])
    except ValueError:
        exit('Все части IP-адреса должны быть числами')

def ip_address_to_num(ip_address: str):
    [p1, p2, p3, p4] = ip_address.split('.')
    return int(p1) * (256 ** 3) + \
        int(p2) * (256 ** 2) + \
        int(p3) * (256 ** 1) + \
        int(p4) * (256 ** 0)


def ips_between(start: str, end: str):
    [min_ip, max_ip] = sorted([ip_address_to_num(end), ip_address_to_num(start)])
    return max_ip - min_ip


print(ips_between(ip_address1, ip_address2))

# или

def ips_between2(start, end):
    if not (validate_ip(start) and validate_ip(end)):
        exit('Все части IP-адреса должны находиться в диапазоне от 0 до 255')
    
    a = sum([int(e) * 256**(3-i) for i, e in enumerate(start.split('.'))])
    b = sum([int(e) * 256**(3-i) for i, e in enumerate(end.split('.'))])

    return abs(a-b)

print(ips_between(ip_address1, ip_address2))