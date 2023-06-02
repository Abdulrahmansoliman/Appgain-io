# This file contains dummy data for testing purposes

from models.shortlinks.shortlinks import ShortLink
from models.shortlinks.init import db


shortlink = ShortLink(
    slug="s5G1f3",
    ios={
        "primary": "http://ios-primary-url",
        "fallback": "http://ios-fallback-url"
    },
    android={
        "primary": "http://android-primary-url",
        "fallback": "http://android-fallback-url"
    },
    web="http://web-url"
)

try:
    shortlink.save()
    print("ShortLink saved successfully.")
except Exception as e:
    print(f"Error saving ShortLink: {e}")
