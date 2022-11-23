import { Box, Button,CardMedia, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import { useForm } from "react-hook-form"

export const MainContent = () => {
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState("")
    const [gridRow, setGridRow] = useState(5);
    const [gridCol, setGridCol] = useState(5);
    const [gridState, setGridState] = useState<boolean[]>(Array(gridRow * gridCol).fill(false));

    useEffect(() => {
        seal();
    }, [gridRow, gridCol, image]);

    const reveal = () => {
        setGridState(Array(gridRow * gridCol).fill(true));
    }

    const seal = () => {
        setGridState(Array(gridRow * gridCol).fill(false));
    }

    const onSubmit = (data: any) => {
        setImage(data.image);
        setGridRow(Number(data.row));
        setGridCol(Number(data.col));
        seal();
    }

    return (
        <>
            <Box>
                <Typography
                    variant="h4"
                    align="center"
                    marginY="40px"
                >
                    かくしえクイズ
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="body1"
                    align="center"
                    marginY="40px"
                >
                    ブロックのうしろのえをあててみよう
                </Typography>
            </Box>
            <Container
                sx={{
                    margin: "auto",
                    width: "600px",
                }}
            >
                <Stack spacing={3}>
                    <TextField required label="たてのブロック" defaultValue={gridRow} {...register("row")} />
                    <TextField required label="よこのブロック" defaultValue={gridCol} {...register("col")} />
                    <TextField required label="絵のURL" {...register("image")} />
                    <Stack justifyContent="center" direction="row" spacing={3}>
                        <Button color="primary" variant="contained" size="large"
                            onClick={handleSubmit(onSubmit)}>
                            スタート
                        </Button>
                        <Button color="primary" variant="contained" size="large"
                            onClick={reveal}>
                            こたえをみる
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            <Box
                sx={{
                    position: "relative",
                    margin: "auto",
                    width: "600px",
                    height: "600px",
                    marginY: "30px"
                }}>
                <CardMedia
                    sx={{
                        position: "absolute",
                        top: "0",
                        width: "100p%",
                        height: "100%",
                        border: 1,
                    }}
                    component="img"
                    image={image}
                    alt=""
                />
                <Grid
                    sx={{
                        position: "absolute",
                        top: "0",
                        width: "100%",
                        height: "100%",
                        // bgcolor: "black",
                    }} columns={gridCol} container={true}>
                    {[...Array(gridRow * gridCol)].map((_, i) => {
                        return (
                            <Grid key={i}
                                sx={{
                                    border: 1,
                                    color: "white",
                                    bgcolor: gridState[i] ? "" : "black",
                                    cursor: "pointer",
                                }}
                                item
                                xs={1}
                                onClick={() => setGridState(gridState.map((state, idx) => (i == idx ? !state : state)))}
                            >
                                <Typography
                                    color="white"
                                >{!gridState[i] && i + 1}</Typography>

                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </>
    );
};
