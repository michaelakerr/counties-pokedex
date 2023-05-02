import { capitalize, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ArrayField, ChipField, ImageField, Show, SimpleList, SimpleShowLayout, SingleFieldList, TextField, useRecordContext } from "react-admin";

const PokemonCardShow = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <Card sx={{
        width: "99%",
        margin: '0.5em',
        display: 'inline-block',
        verticalAlign: 'top'
    }}>
        <CardMedia>
            <ImageField source="sprites.front_default" title="title" />
        </CardMedia>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {capitalize(record.name)}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
                <TextField source="weight" />
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
                <ArrayField source="types">
                    <SingleFieldList>
                        <ChipField source="type.name" size="small" />
                    </SingleFieldList>
                </ArrayField>
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
                <ArrayField source="stats">
                    <SimpleList
                        primaryText={<TextField source="stat.name" />}
                        secondaryText={<ChipField source="base_stat" size="small" />}
                    />
                </ArrayField>
            </Typography>
        </CardContent>
    </Card>;
};

const PokemonShow = (props: any) => {
    return (
        <Show component="div">
            <SimpleShowLayout>
                <PokemonCardShow />
            </SimpleShowLayout>
        </Show>
    );
}
export default PokemonShow;