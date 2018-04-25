import urllib.request
import urllib.parse
import json

def lambda_handler(event, context):
    tasks = get_tasks(event['jql'],event['fields'])
    if(event['jql'] == 'issuetype=Reading'):
        return transformJson(tasks)
def lambda_handler(event, context):
    tasks = get_tasks(event['jql'],event['fields'])
    return transformJson(tasks)

def get_tasks(jql, fields, startAt = 0):
    response = urllib.request.urlopen('https://jira.mattsommer.io/rest/api/2/search?jql=' + jql + '&startAt=' + str(startAt) + '&maxResults=100&fields=' + fields)
    result = json.loads(response.read().decode('utf-8'))
    if (result['startAt'] + result['maxResults']) < result['total']:
        return result['issues'] + get_tasks(jql,fields, startAt + 100)
    else:
        return result['issues']

def transformJson(tasks):
    data = []
    xstr = lambda s: s or ""
    for task in tasks:
        if (task['fields']['issuetype']['name'] == 'Reading'):
            data.append({"id": task['id'],"title": task['fields']['summary'],"author": xstr(task['fields']['customfield_10100']), "status": task['fields']['status']['name']})
        if (task['fields']['issuetype']['name'] == 'Epic'):
            data.append({"id": task['id'],"summary": task['fields']['summary'], "status": task['fields']['status']['name']})
    return data

print(lambda_handler({"jql": "issuetype=Epic","fields": "issuetype,summary,status,customfield_10100"},""))
