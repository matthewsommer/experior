module.exports = {
  siteMetadata: {
    title: 'Jira REST Client',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    {
      resolve: "gatsby-source-jira",
      options: {
        host: "jira.mattsommer.io",
      },
    }]
}
