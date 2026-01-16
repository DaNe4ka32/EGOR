import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import type { Product } from "../types/product";
interface SizeSelectorModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (size: string) => void;
}
const SizeSelectorModal: React.FC<SizeSelectorModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const availableSizes = product.sizes.filter((size) => size.available);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    availableSizes.length === 1 ? availableSizes[0].size : null
  );

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(selectedSize);
    }
  };
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Выберите размер</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {availableSizes.map((size) => (
            <Button
              key={size.size}
              variant={selectedSize === size.size ? "contained" : "outlined"}
              color="primary"
              onClick={() => setSelectedSize(size.size)}
              sx={{
                minWidth: 60,
                minHeight: 40,
                fontWeight: "bold",
              }}
            >
              {size.size}
            </Button>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Отмена
        </Button>
        <Button
          onClick={handleAddToCart}
          variant="contained"
          color="primary"
          disabled={!selectedSize}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SizeSelectorModal;
