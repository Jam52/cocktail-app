import React from "react";
import classes from "./AboutPage.module.scss";
import Divider from "../Divider/Divider";

const aboutPage = (props) => {
    return (
        <div className={classes.AboutPage}>
            <h2 className={classes.Title}>Madame Mimi's</h2>
            <p className={classes.Paragraph}>
                The concept for Madame Mimi's originally started with Mia’s
                (Mimi’s) dad. For her 8th birthday he put together a cocktail
                bar (full of soft drinks of course) to refresh all the kids at
                the birthday party. It was her first taste of making and mixing
                drinks and she thought it was loads of fun! She also learned
                early on never to put fizzy drinks into bar optics, but that’s a
                story for another time.
            </p>
            <p className={classes.Paragraph}>
                Flash forward 8 years Mia and her father began talking more
                seriously about Madame Mimi’s cocktail bar, they went through
                various iterations from a Moroccan theme to a classic Whisky
                Lounge but the common theme has always been Madame Mimi - a
                mother hen figure of the establishment, knowledgeable, wise,
                endearing, there to look after the patrons and serve the most
                amazing drinks. One day they hope to make this dream a reality.
            </p>
            <Divider className={classes.Divider} />
            <p className={classes.Paragraph}>
                Jamie (Mimi’s husband) is an aspiring front end web developer
                and while looking for projects to build to improve his skills
                and knowledge he found TheCocktailDb - a cocktail database API,
                and decided to bring a small part of Madame Mimi’s to life!
            </p>
        </div>
    );
};

export default aboutPage;
