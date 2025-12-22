import {
  Dialog,DialogTitle,DialogContent,DialogActions,
  TextField,Button,Select,FormControl,InputLabel,Grid,
  Box, Avatar, Typography, Divider, MenuItem, Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { supService } from "../../service/sup.service";


const ImportModal = ({ open, onClose, product, onSubmit }) => {
    const [suppliers, setSuppliers] = useState([]);
    
    const [form, setForm] = useState({
        supId: "",
        quantity: "",
        cost_price: "",
        stock: "",
        note: ""
    });


    const fetchSupplier = async () => {
        try {
            const supDta = await supService.getAll();
            setSuppliers(supDta);
        }
        catch (e) {

        }
    }

    useEffect(() => {
        fetchSupplier();
    }, [])

   
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        onSubmit({
        supId: form.supId,
        items: [
            {
            variantId: product.id,
            quantity: Number(form.quantity),
            cost_price: Number(form.cost_price),
            stock: Number(form.stock)
            }
        ],
        note: form.note
        });
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Nhập kho sản phẩm</DialogTitle>

        <DialogContent>

            <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{
                    p: 2,
                    bgcolor: "#f9fafb",
                    borderRadius: 2,
                    mb: 2
                }}
                >
                <Avatar
                    src={product?.path}
                    variant="rounded"
                    sx={{ width: 64, height: 64 }}
                />
                <Typography fontWeight={600} fontSize={16}>
                {product?.name}
                </Typography>
            </Box>
            {/* FORM */}
            <Stack spacing={2} mt={1}>
            {/* Nhà cung cấp */}
            <TextField
                select
                label="Nhà cung cấp"
                name="supId"
                value={form.supId || ""}
                onChange={handleChange}
                fullWidth
            >
                <MenuItem disabled value="">
                Chọn nhà cung cấp
                </MenuItem>
                {suppliers.map((sup) => (
                <MenuItem key={sup.id} value={sup.id}>
                    {sup.name}
                </MenuItem>
                ))}
            </TextField>

            {/* Số lượng + Giá nhập */}
            <Box display="flex" gap={2}>
                <TextField
                label="Số lượng nhập"
                name="quantity"
                type="number"
                fullWidth
                onChange={handleChange}
                />

                <TextField
                label="Giá nhập / đơn vị"
                name="cost_price"
                type="number"
                fullWidth
                onChange={handleChange}
                />
            </Box>

            {/* Ngưỡng cảnh báo */}
            <TextField
                label="Ngưỡng cảnh báo tồn kho"
                name="stock"
                type="number"
                fullWidth
                onChange={handleChange}
            />

            {/* Ghi chú */}
            <TextField
                label="Ghi chú"
                name="note"
                multiline
                minRows={2}
                maxRows={3}
                fullWidth
                onChange={handleChange}
            />
            </Stack>
        </DialogContent>

        {/* Nút */}
        <DialogActions
            sx={{
            justifyContent: "center",
            gap: 2,
            pb: 3
            }}
        >
            <Button variant="outlined" onClick={onClose}>
            HUỶ
            </Button>

            <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ minWidth: 180 }}
            disabled={!form.supId || !form.quantity || !form.cost_price}
            >
            XÁC NHẬN NHẬP
            </Button>
        </DialogActions>
    </Dialog>


  );
};

export default ImportModal;
