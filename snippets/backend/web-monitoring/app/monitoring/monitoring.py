import time
import re

import aiohttp

from .monitoring_result import MonitoringResult


async def monitor_website(session: aiohttp.ClientSession, url: str) -> MonitoringResult:
    start_time = time.time()

    try:
        res = await session.get(url)
        text = await res.text()

        regexp_match = re.search(r'<title>(?P<title>.+)</title>', text)

        title: str | None = None

        if regexp_match:
            title = regexp_match.groupdict().get('title')

        end_time = time.time()

        return MonitoringResult(url, res.status, end_time - start_time, title)
    except (TimeoutError):
        return MonitoringResult(url, 408, time.time() - start_time)
