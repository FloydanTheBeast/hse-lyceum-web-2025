from typing import Optional
from dataclasses import dataclass


@dataclass
class MonitoringResult:
    url: str
    status: int
    request_time: float
    title: Optional[str] = None

    def to_csv_row(self):
        return f'{self.url}, {self.status}, {self.request_time}, {self.title}\n'
