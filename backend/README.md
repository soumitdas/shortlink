## API Routes

- GET / redirect to frontend
- POST /shorten to create a shortlink
- POST /custom-shortcode to check custom shortcode available or not (Auth) [TODO]
- GET /links to get all the links of an `uid` user (Auth) [Paginated]
- GET /links/{slug} to get basic link details
- PATCH /links/{slug} edit link details
- GET /links/{slug}/analytic to get Analytics (Auth)
- GET /{slug} redirect to long url
- GET /{slug}+ redirect to frontend analytics
