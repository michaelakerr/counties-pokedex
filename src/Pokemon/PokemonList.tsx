import { capitalize, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { List, useListContext } from "react-admin";

interface ListType {
    record: any, id: number, onToggleItem: any, children: any, selected: boolean,
    selectable: any, ids: any
}

const CardRecords = (props: ListType) => {
    const { data, isLoading, resource, perPage } = useListContext();
    if (isLoading) return <p>Loading...</p>;

    return (<Grid container columns={perPage}>{!isLoading && data.map((record: any) => {
        return (
            <Grid xs={12} md={perPage / 2} lg={perPage / 5}>
                <Card
                    sx={{
                        width: "95%",
                        margin: '0.5em',
                        verticalAlign: 'top',
                        display: "inline-block",
                    }}
                >
                    <CardActionArea href={`/${resource}/${record.name}/show`}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center" justifyContent="center" textAlign="center">
                                <Grid xs={12} sm={6} >
                                    <CardMedia component="img"
                                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${record.pokemonId}.png`} />
                                </Grid>
                                <Grid xs={12} sm={6} textAlign="center">
                                    <Typography gutterBottom variant="h5" component="div" sx={{ margin: 0 }}>
                                        {capitalize(record.name)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
    )}
    </Grid>)
}



const PokemonList = (props: any) => (
    <List title="All Pokemon" component="div" exporter={false}>
        <CardRecords {...props} />
    </List>
);

export default PokemonList;