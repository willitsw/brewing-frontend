# What Ales You
What Ales You helps you keep track of your brewing hobby, and gives you tools to improve your skills. The idea is that this app will be driven and supported by the homebrewing community, and as long as donations support its operational costs, there will never be any ads, paywalls, or premium tiers.

# Table Of Contents
- [Front End Repo (You are already here...)](https://github.com/willitsw/brewing-frontend) - The FE is a React SPA that leans heavily on Ant Design for a component library, and it utilizes Redux for global state management.
- [Back End Repo](https://github.com/willitsw/brewing-backend) - The BE is a fairly simple CRUD api that stores information in AWS DynamoDB. Currently, it is deployed as a bunch of Node Lambdas, each wired up to API Gateway.
- [Shared Code Repo](https://github.com/willitsw/brewing-shared) - The shared repo is really just a place to hold shared interfaces and a little bit of shared business logic. Not a whole lot there right now, but it might grow in the future.
- [Infrastructure](https://github.com/willitsw/brewing-infra) - This holds all the IAC asset provisioning documentation. It is all currently deployed to AWS via Terraform.
- [Feature Roadmap](#feature-roadmap)
- [Tech Debt](#tech-debt)


# Feature Roadmap
These features are not listed in any particular order of priority.

### Water Chemistry
**Effort - large**

Bob wants to be able to calculate the acidity and mineral content of his water for each and every recipe. He would like a central place to configure his tap water profile, and that profile will be usable by all recipes. In each recipe, Bob wants tools to configure the proportions of tap water / RO water, acid additions, and mineral additions. All of these additions will update the overall acidity and mineral levels in real time as he builds and tweaks the recipe.

### Import/Export Recipes
**Effort - medium**

Carl wants to be able to import and export recipes via BeerXML or BeerJSON.

### Reporting
**Effort - large**

Stan would like to be able to generate some visualizations of his brewing over time, and possibly view some global trends in the homebrewing world:
- Efficiency of brew sessions
- Popularity of certain styles
- Popularity of certain configurations/equipment
- Popularity of certain ingredients
- ???

### Featured Recipes
**Effort - Medium**

McKenzie wants to see a rotating display of featured recipes on the home page.

### Public Recipes
**Effort - Large**

Helga wants to be able to search and rate public recipes.

### Misc Calculators
**Effort - Medium**

Jenny wants a page where she can use miscellaneous brewing calculators, such as:
- ABV
- Priming Sugar
- CO2 Pressure
- ???

### Enhanced Brew Log
**Effort - Small**

Jorge would like the brew log to tell him some statistics for each brew session:
- Realized ABV
- Actual Efficiency
- ???

### Hooch and Wine Spike
**Effort - Medium**

What would it take to make this app more useful to hoochers and wine makers? Is that feasable?


# Tech Debt

### Get rid of moment.js in the FE
**Effort - small**

Moment.js is no longer being developed and should be switched out for Luxon

### Spike - Node api frameworks for lambda
**Effort - medium**

Is deploying the api as separate lambdas really the way to go? They are all very lightweight but each endpoint will have more cold starts because they are all separate lambda functions. Is there a very lightweight framework that actually works well deployed on lambda? Preferably stateless?

### Migrate to TF Cloud
**Effort - medium**

Move our state and terraform operations to TF Cloud. Also, create two different projects there so that we can use the exact same code for staging and prod, instead of just duplicating resources.

### Fix Facebook SSO
**Effort - small**

Facebook SSO doesn't work. The code is basically there, but for some reason it isn't working. Investigate/fix

### Tests
**Effort - large**

Really need to start writing more tests...