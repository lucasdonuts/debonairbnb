# DebonairBnB

DebonairBnB is a mock up of a clothing rental service. Many events call for outfits that are either much nicer than your daily attire, or really only fit that event. So why buy it just for it to collect dust when you take it off?

## Technologies
- **Ruby** 2.7.6
- **PostgreSQL** 14.5
- **React** 18.2

## Setup

**Clone the repository**

```
git clone git@github.com:lucasdonuts/debonairbnb.git
```

**Install dependencies**

```
npm install --prefix client && bundle install
```

**Setup and seed database**

See the [PostgreSQL downloads page](https://www.postgresql.org/download/) for installation
```
rails db:create
rails db:migrate
rails db:seed
```

**Startup**
```
sudo service postgresql start
rails s
```
In a second terminal
```
npm start --prefix client
```

## Notes
The backend is set up to run on localhost port 3000 and the frontend on port 4000