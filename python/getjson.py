import urllib.request
import urllib.parse
import json

def lambda_handler(event, context):
    tasks = get_tasks('issuetype=Reading','summary,status,customfield_10100')
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
        data.append({"title": task['fields']['summary'],"author": xstr(task['fields']['customfield_10100']), "status": task['fields']['status']['name']})
    return data

print(lambda_handler("",""))
