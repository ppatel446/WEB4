const { rejects } = require("assert");
const file = require("fs"); 
const { resolve } = require("path");


var posts = [];
var categories = [];



initialize = function () {
  return new Promise((resolve, reject) => {
    file.readFile("./data/posts.json", "utf8", (err, data) => {
      if (err) {
        reject("unable to read file");
      } else {
        posts = JSON.parse(data);
      }
    });

    file.readFile("./data/categories.json", "utf8", (err, data) => {
      if (err) {
        reject("unable to read file");
      } else {
        categories = JSON.parse(data);
      }
    });
    resolve();
  });
};

getAllPosts = function () {
  return new Promise((res, rej) => {
    if (posts.length === 0) {
      rej("no results returned");
    } else {
      res(posts);
    }
  });
};

getPublishedPosts = function () {
  return new Promise((res, rej) => {
    var filteredPosts = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].published === true) {
        filteredPosts.push(posts[i]);
      }
    }

    if (filteredPosts.length === 0) {
      rej("no results returned");
    } else {
      res(filteredPosts);
    }
  });
};

getCategories = function () {
  return new Promise((res, rej) => {
    if (categories.length === 0) {
      rej("no results returned");
    } else {
      res(categories);
    }
  });
};

function addPost(postData) {
  return new Promise((resolve, reject) => {
    if (postData.published === undefined) {
      postData.published = false;
    } else {
      postData.published = true;
    }

    postData.id = posts.length + 1;
    posts.push(postData);
    resolve(postData);
  });
}

function getPostsByCategory(category) {
  return new Promise((resolve, reject) => {
    const matchingPosts = posts.filter((post) => post.category == category);
    if (matchingPosts.length > 0) {
      resolve(matchingPosts);
    } else {
      reject("No results returned");
    }
  });
}

function getPostsByMinDate(minDate) {
  return new Promise((resolve, reject) => {
    const matchingPosts = posts.filter(
      (post) => new Date(post.postDate) >= new Date(minDate)
    );
    if (matchingPosts.length > 0) {
      resolve(matchingPosts);
    } else {
      reject("No results returned");
    }
  });
}

function getPostById(id) {
  return new Promise((resolve, reject) => {
    const matchingPosts = posts.filter((post) => post.id == id);
    const selectPost = matchingPosts[0];
    if (selectPost) {
      resolve(selectPost);
    } else {
      reject("No results returned");
    }
  });
}

module.exports = {
  initialize,
  getAllPosts,
  getPublishedPosts,
  getCategories,
  addPost,
  getPostsByCategory,
  getPostsByMinDate,
  getPostById,
};