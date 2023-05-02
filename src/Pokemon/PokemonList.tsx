import { capitalize, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { List, ShowButton, useListContext } from "react-admin";

interface ListType {
    record: any, id: number, onToggleItem: any, children: any, selected: boolean,
    selectable: any, ids: any
}

const CardRecords = (props: ListType) => {
    const { data, isLoading, resource } = useListContext();

    if (isLoading) return <p>Loading...</p>;

    return (<>{!isLoading && data.map((record: any) => {
        return (
            <Card sx={{
                width: "18%",
                margin: '0.5em',
                display: 'inline-block',
                verticalAlign: 'top'
            }}>
                <CardMedia>
                    <img alt={record.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${record.pokemonId}.png`} />
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {capitalize(record.name)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ShowButton label="Show" record={record} />
                </CardActions>
            </Card>
        )
    }
    )}
    </>)
}



const PokemonList = (props: any) => (
    <List title="All Pokemon" component="div" >
        <CardRecords {...props} />
    </List>
);

export default PokemonList;