import string
import random
from flask import Blueprint, jsonify, request, redirect
from models.shortlinks.shortlinks import ShortLink
import db_intialization_script
from flask_cors import cross_origin


shortlinks_bp = Blueprint('shortlinks', __name__)


# List All Shortlinks
@shortlinks_bp.route('/', methods=['GET'])
def list_shortlinks():
    shortlinks = ShortLink.objects()
    formatted_shortlinks = [shortlink.format() for shortlink in shortlinks]
    data = { "data":formatted_shortlinks
    }
    response = jsonify(data)
    return response, 200


@shortlinks_bp.route('/', methods=['POST'])
def create_shortlink():
    data = request.get_json()
    slug = data.get('slug')
    ios = data.get('ios')
    android = data.get('android')
    web = data.get('web')

    # Validate required fields
    if not ios or not android or not web:
        return jsonify({'error': 'ios, android and web targets are required'}), 400

    # Generate a random slug if not provided
    if not slug:
        slug = generate_unique_slug()

    # Create the ShortLink object
    shortlink = ShortLink(
        slug=slug,
        ios=ios,
        android=android,
        web=web
    )

    # Save the shortlink
    try:
        shortlink.save()
        return jsonify(shortlink.format()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def generate_unique_slug(length=6):
    chars = string.ascii_letters + string.digits
    slug = ''.join(random.choice(chars) for _ in range(length))

    # Check if the slug is already in use
    while ShortLink.objects(slug=slug).first():
        slug = ''.join(random.choice(chars) for _ in range(length))

    return slug

@shortlinks_bp.route('/<slug>', methods=['PUT'])
def update_shortlink(slug):
    shortlink = ShortLink.objects(slug=slug).first()

    if not shortlink:
        return jsonify({'error': 'Shortlink not found'}), 404

    if not request.is_json:
        return jsonify({'error': 'Invalid Content-Type'}), 400

    data = request.get_json()

    # Only update sent attributes, leave others as is
    if 'ios' in data:
        shortlink.ios = data['ios']
    if 'android' in data:
        shortlink.android = data['android']
    if 'web' in data:
        shortlink.web = data['web']

    shortlink.save()

    return jsonify(shortlink.format()), 201
