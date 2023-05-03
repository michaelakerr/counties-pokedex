import { capitalize, Card, CardContent, CardMedia, Chip, Grid, InputLabel, Table, TableCell, TableRow, Typography } from "@mui/material";
import { ArrayField, ChipField, Show, SimpleShowLayout, SingleFieldList, useRecordContext } from "react-admin";

const PokemonCardShow = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <Card sx={{
        width: "99%",
        verticalAlign: 'top'
    }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" textAlign="left">
            <Grid xs={12} sm={4} >
                <CardMedia component="img"
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${record.order}.png`} />
            </Grid>
            <Grid xs={12} sm={8} >
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" marginTop="20px">
                        {capitalize(record.name)}
                    </Typography>

                    <ArrayField source="types">
                        <SingleFieldList linkType={false}>
                            <ChipField source="type.name" size="small" />
                        </SingleFieldList>
                    </ArrayField>

                    <Table>
                        {
                            record.stats.map((stat: any) => {
                                return <TableRow>
                                    <TableCell >
                                        <InputLabel>{capitalize(stat.stat.name.replace('-', ' '))}</InputLabel>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={stat.base_stat} />
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </Table>
                </CardContent>
            </Grid>
        </Grid>
    </Card>;
};

const PostTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>{capitalize(record.name)}</span>;
};

const PokemonShow = () => {

    return (
        <Show title={<PostTitle />} component="div" >
            <SimpleShowLayout>
                <PokemonCardShow />
            </SimpleShowLayout>
        </Show>
    );
}
export default PokemonShow;