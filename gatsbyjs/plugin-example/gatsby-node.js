/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem');
const path = require(`path`);

exports.createPages = ({ graphql, boundActionCreators }) => {
    console.log("Plugin Jira Source: Creating pages");
    const { createPage } = boundActionCreators;
    return new Promise((resolve, reject) => {
        graphql(`
        {
          allTask {
            edges {
              node {
                id
                epic
                key
                summary
                slug
                project
                type
              }
            }
          }
        }
      `).then(result => {
                // var projects = $.unique(result.data.allTask.edges.map(function (task) {return task.project;}));
                // projects.reverse();
                // console.log(projects);
                result.data.allTask.edges.map(({ node }) => {
                    createPage({
                        path: node.slug,
                        component: path.resolve(`./src/templates/task.js`),
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            slug: node.slug,
                            key: node.key,
                            epicKey: (node.epic != null ? node.epic : ""),
                            id: node.id
                        },
                    });
                });

                let projects = new Set();
                result.data.allTask.edges.map(({ node }) => { return projects.add(node.project)});
                for (let project of projects) {
                    createPage({
                        path: project.replace(/[^\w\s]/gi,'').replace(/\s+/g, '-').toLowerCase(),
                        component: path.resolve(`./src/templates/task-list.js`),
                        context: {
                            project: project
                        },
                    });
                }

                let issuetypes = new Set();
                result.data.allTask.edges.map(({ node }) => { return issuetypes.add(node.type)});
                for (let type of issuetypes) {
                    createPage({
                        path: type.replace(/[^\w\s]/gi,'').replace(/\s+/g, '-').toLowerCase(),
                        component: path.resolve(`./src/templates/type-list.js`),
                        context: {
                            type: type
                        },
                    });
                }
                resolve();
            });
    });
};

