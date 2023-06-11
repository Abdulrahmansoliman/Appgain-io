# URL shortner

## URL Shortener API

To run the backend server for the URL Shortener API, follow these steps:
Make sure you have Python installed on your system.

1. Clone the project repository to your local machine.

2. Open a terminal or command prompt and navigate to the project directory.

3. Install the required dependencies by running the following command:
pip install -r requirements.txt

Once the dependencies are installed, you can start the backend server by running the __init__.py file.

This will start the server on http://127.0.0.1:5000/.

You can now make requests to the API endpoints using a tool like cURL, Postman, or any programming language of your choice.

#### Note: Make sure to update the API endpoints in your requests to match the routes defined in routes/shortlinks.py file.

## Endpoints

### List Shortlinks

GET /shortlinks
This endpoint retrieves a list of all existing shortlinks. It returns a JSON response containing an array of shortlink objects with their respective details.

Example Response:
'''
json

{
  "data": [
    {
      "slug": "abc123",
      "ios": {
        "primary": "http://ios-primary-url",
        "fallback": "http://ios-fallback-url"
      },
      "android": {
        "primary": "http://android-primary-url",
        "fallback": "http://android-fallback-url"
      },
      "web": "http://web-url"
    },
    {
      "slug": "def456",
      "ios": {
        "primary": "http://ios-primary2-url",
        "fallback": "http://ios-fallback2-url"
      },
      "android": {
        "primary": "http://android-primary2-url",
        "fallback": "http://android-fallback2-url"
      },
      "web": "http://web-url2"
    }
  ]
}
'''
Create Shortlink
bash
Copy code
POST /shortlinks
This endpoint creates a new shortlink. It requires the following parameters in the request body:

slug (optional): The custom slug for the shortlink.
ios (object): The primary and fallback URLs for the iOS platform.
android (object): The primary and fallback URLs for the Android platform.
web (string): The URL for the web platform.
Example Request Body:

json
Copy code
{
  "slug": "custom-slug",
  "ios": {
    "primary": "http://ios-primary-url",
    "fallback": "http://ios-fallback-url"
  },
  "android": {
    "primary": "http://android-primary-url",
    "fallback": "http://android-fallback-url"
  },
  "web": "http://web-url"
}
Example Response:

json
Copy code
{
  "slug": "custom-slug",
  "ios": {
    "primary": "http://ios-primary-url",
    "fallback": "http://ios-fallback-url"
  },
  "android": {
    "primary": "http://android-primary-url",
    "fallback": "http://android-fallback-url"
  },
  "web": "http://web-url"
}
Update Shortlink
bash
Copy code
PUT /shortlinks/{slug}
This endpoint updates an existing shortlink with the specified slug. It allows you to modify specific attributes of the shortlink while leaving others unchanged. The request body should contain the updated attributes.

Example Request:

bash
Copy code
PUT /shortlinks/custom-slug
Example Request Body:

json
Copy code
{
  "ios": {
    "fallback": "http://updated-ios-fallback-url"
  }
}
Example Response:

json
Copy code
{
  "slug": "custom-slug",
  "ios": {
    "primary": "http://ios-primary-url",
    "fallback": "http://updated-ios-fallback-url"
  },
  "android": {
    "primary": "http://android-primary-url",
    "fallback": "http://android-fallback-url"
  },
  "web": "http://web-url"
}
Error Responses
400 Bad Request: Returned when the request is missing required parameters or has an invalid format.
404 Not Found: Returned when the requested
