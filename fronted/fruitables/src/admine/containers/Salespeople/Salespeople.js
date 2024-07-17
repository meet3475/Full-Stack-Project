import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addsalespeople, deletesalespeople, editsalespeople, getsalespeople } from '../../../redux/action/salespeople.action';

function Salespeople(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const salespeople = useSelector((state) => state.salespeople.salespeople);

    useEffect(() => {
        dispatch(getsalespeople());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(false);
    };

    let salespeopleSchema = object({
        sname: string().required("Please enter Salespeople name"),
        city: string().required("Please enter City"),
        comm: string().required("Please enter Commission")
    });

    const formik = useFormik({
        initialValues: {
            sname: '',
            city: '',
            comm: ''
        },
        validationSchema: salespeopleSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editsalespeople(values));
            } else {
                dispatch(addsalespeople(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleDelete = (snum) => {
        dispatch(deletesalespeople(snum));
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    }

    const columns = [
        { field: 'snum', headerName: 'Salespeople Number', width: 170 },
        { field: 'sname', headerName: 'Salespeople Name', width: 170 },
        { field: 'city', headerName: 'Salespeople City', width: 170 },
        { field: 'comm', headerName: 'Salespeople Commission', width: 170 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" size="large" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row.snum)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Salespeople
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Salespeople</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="sname"
                            name="sname"
                            label="Salespeople Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sname}
                            error={errors.sname && touched.sname ? true : false}
                            helperText={errors.sname && touched.sname ? errors.sname : ''}
                        />
                        <TextField
                            margin="dense"
                            id="city"
                            name="city"
                            label="Salespeople City"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            error={errors.city && touched.city ? true : false}
                            helperText={errors.city && touched.city ? errors.city : ''}
                        />
                        <TextField
                            margin="dense"
                            id="comm"
                            name="comm"
                            label="Salespeople Commission"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comm}
                            error={errors.comm && touched.comm ? true : false}
                            helperText={errors.comm && touched.comm ? errors.comm : ''}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.snum}
                    rows={salespeople}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </>
    );
}

export default Salespeople;
