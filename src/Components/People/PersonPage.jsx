import {useParams} from "react-router-dom";
import React from "react";
import axios from "axios";
import {BACKEND_URL} from "../../constants";

const PEOPLE_READ_ENDPOINT = `${BACKEND_URL}/users`;

const personObjectToArray = (data) => {

}

export function PersonPage() {
    const [person, setPerson] = React.useState([]);

    const {email} = useParams();

    const fetchPerson = () => {
        axios.get(PEOPLE_READ_ENDPOINT)
            .then(
                ({data}) => {
                    setPerson(personObjectToArray(data))
                }
            )
            .catch((error) => setError(`There was a problem getting ${email}. They might not exist.`));
    };

    return <h1>{email}</h1>
}