import { useState, FormEvent } from "react";
import { TextField, Box, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface PokemonSearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export function PokemonSearchBar({
  onSearch,
  loading = false,
}: PokemonSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mb: 3 }}>
      <TextField
        fullWidth
        placeholder="Buscar pokémon por nome ou ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={loading}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                disabled={loading || !searchQuery.trim()}
                sx={{
                  borderRadius: "20px",
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
