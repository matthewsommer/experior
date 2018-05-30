/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const axios = require('axios');
const crypto = require('crypto');
const { createFilePath } = require('gatsby-source-filesystem');
const path = require(`path`);

exports.createPages = ({ graphql, boundActionCreators }) => {
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
              }
            }
          }
        }
      `).then(result => {
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
                resolve();
            });
    });
};

exports.sourceNodes = async ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;

    const fetchTasks = () => jiraQuery('', 0)
        .then((response) => {
            return response;
        })
        .then((response) => {
            var issues = axios.all(queryArray(response.data.total))
                .then(function (results) {
                    let temp = results.map(r => r.data.issues);
                    temp.push(response.data.issues);
                    var merged = [].concat.apply([], temp);
                    return merged;
                });
            return issues;
        });

    const res = await fetchTasks();

    // map into these results and create nodes
    res.map((task, i) => {
        // Create your node object
        const taskNode = {
            // Required fields
            id: '${i}',
            parent: '__SOURCE__',
            internal: {
                type: 'Task', // name of the graphQL query --> allTask {}
                // contentDigest will be added just after
                // but it is required
            },
            children: [],
            id: task.id,
            key: task.key,
            type: task.fields.issuetype.name,
            description: task.fields.description,
            summary: task.fields.summary,
            status: task.fields.status.name,
            labels: task.fields.labels,
            components: task.fields.components,
            priority: task.fields.priority.name,
            project: task.fields.project.name,
            author: task.fields.customfield_10100,
            epic: task.fields.customfield_10009,
            subtasks: task.fields.subtasks,
            slug: task.fields.summary.replace(/[^\w\s]/gi,'').replace(/\s+/g, '-').toLowerCase()
        }

        // Get content digest of node. (Required field)
        const contentDigest = crypto
            .createHash('md5')
            .update(JSON.stringify(taskNode))
            .digest('hex');
        // add it to taskNode
        taskNode.internal.contentDigest = contentDigest;

        // Create node with the gatsby createNode() API
        createNode(taskNode);
    });

    return;
}

function jiraQuery(jql, startAt) {
    return axios.get('https://jira.mattsommer.io/rest/api/2/search?jql=' + jql + '&startAt=' + startAt + '&maxResults=100');
}

function queryArray(total) {
    var queries = [];
    for (var i = 0; i < Math.floor(total / 100); i++) {
        queries[i] = jiraQuery('', (i + 1) * 100);
    }
    return queries;
}