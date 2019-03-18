import os
from jira import JIRA
from jinja2 import Environment, FileSystemLoader

jira = JIRA('https://jira.atlassian.com')

issue = jira.issue('JRA-10')
print(issue.fields.project.key)
print(issue.fields.summary)

results = jira.search_issues("", 0, 10, True, )

# Capture our current directory
THIS_DIR = os.path.dirname(os.path.abspath(__file__))


def print_html_doc():
    # Create the jinja2 environment.
    # Notice the use of trim_blocks, which greatly helps control whitespace.
    j2_env = Environment(loader=FileSystemLoader(THIS_DIR),
                         trim_blocks=True)
    print(j2_env.get_template('templates/onboarding.html').render(
        title='Hellow Gist from GutHub',
        name='Matt',
        issues=results
    ))


def output_scratch():
    j2_env = Environment(loader=FileSystemLoader(THIS_DIR),
                         trim_blocks=True)
    f = open("dist/scratch.html", "w")
    f.write(j2_env.get_template('templates/scratch.html').render(
        issues=results
    ))


if __name__ == '__main__':
    print_html_doc()
    output_scratch()
