# Template React + Flask framework

Created and maintained by: TheReddKing (TechX)

## Dev Installation (MacOS or Linux):

    python -m venv env
    source env/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
    cd yarn && yarn
    yarn

Now you need to set up ENV files

`cp .env.example .env`

and set their respective values

## Dev run

yarn run dev

### Editing

Look at the HOWTHISWASMADE.md file for more information

## Deploy on HEROKU

You first need to actually create a heroku application

Then you need to copy over the environmental variables from your local computer

    sed 's/#[^("|'')]*$//;s/^#.*$//' .env | \
    xargs heroku config:set

Afterwards, a simple heroku push will configure everything

    git push heroku master
