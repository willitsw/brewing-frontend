# What Ales You
What Ales You helps you keep track of your brewing hobby, and gives you tools to improve your skills. The app is driven and supported by the homebrewing community, and as long as donations support its operational costs, there will never be any ads, paywalls, or premium tiers.

# Table Of Contents
[Front End Repo (You are already here...)](https://github.com/willitsw/brewing-frontend) - The FE is a React SPA that leans heavily on Ant Design for a component library, and it utilizes Redux for global state management.
[Back End Repo](https://github.com/willitsw/brewing-backend) - The BE is a fairly simple CRUD api that stores information in AWS DynamoDB. Currently, it is deployed as a bunch of Node Lambdas, each wired up to API Gateway.
[Shared Code Repo](https://github.com/willitsw/brewing-shared) - The shared repo is really just a place to hold shared interfaces and a little bit of shared business logic. Not a whole lot there right now, but it might grow in the future.
[Infrastructure](https://github.com/willitsw/brewing-infra) - This holds all the IAC asset provisioning documentation. It is all currently deployed to AWS via Terraform.
[Feature Roadmap](#feature-roadmap)


# Feature Roadmap
These features are not listed in any particular order of priority.

### Water Chemistry
**Effort - large**
Bob wants to be able to calculate the acidity and mineral content of his water for each and every recipe. He would like a central place to configure his tap water profile, and that profile will be usable by all recipes. In each recipe, Bob wants tools to configure the proportions of tap water / RO water, acid additions, and mineral additions. All of these additions will update the overall acidity and mineral levels in real time as he builds and tweaks the recipe.

### Reporting
**Effort - large**
Stan would like to be able to generate some visualizations of his brewing over time, and possibly view some global trends in the homebrewing world:
- Efficiency of brew sessions
- Popularity of certain styles
- Popularity of certain configurations/equipment
- Popularity of certain ingredients
- ???

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

