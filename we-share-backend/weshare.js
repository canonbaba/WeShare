const fs = require("fs-extra");
const path = require("path");

exports.seed = (knex, Promise) => {
  let Category = fs.readJsonSync(path.join(__dirname, "/category.json"));
  let Book = fs.readJsonSync(path.join(__dirname, "/book.json"));
  let Electronics = fs.readJsonSync(path.join(__dirname, "/electronics.json"));
  let Toy = fs.readJsonSync(path.join(__dirname, "/toy.json"));
  let Vehicle = fs.readJsonSync(path.join(__dirname, "/vehicle.json"));
  let videoGame = fs.readJsonSync(path.join(__dirname, "/videoGame.json"));

  return knex("category").insert(Category)
    .join("post")
    .then(() => {
      return knex("post").insert(Book).where("category.id", "post.category_id")
    .then(()=>{
      return knex("post").insert(Electronics).where("category.id", "post.category_id")
    .then(()=>{
      return knex("post").insert(Toy).where("category.id", "post.category_id")
    .then(()=>{
      return knex("post").insert(Vehicle).where("category.id", "post.category_id")
    .then(()=>{
      return knex("post").insert(videoGame).where("category.id", "post.category_id")
    })
    })
    })
    }
  
  )


  




      // Activities.forEach(activity => {
      //   let typeOfActivity = activity.type;
      //   let cities = activity.city;
      //   activityArray.push(createActivity(knex, activity, typeOfActivity, cities));
      // });
      // return Promise.all(activityArray);
    });
};

// const createActivity = (knex, activity, typeOfActivity, cities) => {
//   return knex("typeOfActivities")
//     .where("name", typeOfActivity)
//     .first()
//     .then(typeOfActivityRecord => {
//       return knex("cities")
//         .where("name", cities)
//         .first()
//         .then(cities => {
//           return knex("activities").insert({
//             name: activity.name,
//             typeOfActivities_id: typeOfActivityRecord.id,
//             cities_id: cities.id,
//             address: activity.address,
//             description: activity.description,
//             photo: activity.photo,
//             is_active: activity.is_active,
//             reviewing_status: activity.reviewing_status
//           });
//         });
//     });
// };