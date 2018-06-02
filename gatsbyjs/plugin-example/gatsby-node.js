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
          allJiraIssue {
            edges {
                node {
                    slug
                    jiraIssue {
                        id
                        key
                        jiraFields {
                            summary
                            customfield_10009
                            project {
                                name
                            }
                            issuetype {
                                name
                            }
                            status {
                                name
                            }
                        }
                    }
                }
            }
          }
        }
      `).then(result => {
                result.data.allJiraIssue.edges.map(({ node }) => {
                    createPage({
                        path: node.slug,
                        component: path.resolve(`./src/templates/task.js`),
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            slug: node.slug,
                            key: node.jiraIssue.key,
                            epicKey: (node.jiraIssue.jiraFields.customfield_10009 != null ? node.jiraIssue.jiraFields.customfield_10009 : ""),
                            id: node.jiraIssue.id
                        },
                    });
                });

                let projects = new Set();
                result.data.allJiraIssue.edges.map(({ node }) => { return projects.add(node.jiraIssue.jiraFields.project.name) });

                for (let project of projects) {
                    createPage({
                        path: project.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase(),
                        component: path.resolve(`./src/templates/task-list.js`),
                        context: {
                            project: project
                        },
                    });
                }

                let statuss = new Set();
                result.data.allJiraIssue.edges.map(({ node }) => { return statuss.add(node.jiraIssue.jiraFields.status.name) });

                for (let status of statuss) {
                    createPage({
                        path: status.replace(/\s+/g, '-').toLowerCase(),
                        component: path.resolve(`./src/templates/status-list.js`),
                        context: {
                            status: status
                        },
                    });
                }

                let issuetypes = new Set();
                result.data.allJiraIssue.edges.map(({ node }) => { return issuetypes.add(node.jiraIssue.jiraFields.issuetype.name) });

                for (let type of issuetypes) {
                    createPage({
                        path: type.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase(),
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

