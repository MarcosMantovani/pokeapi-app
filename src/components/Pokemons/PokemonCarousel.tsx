import { useState, useEffect, useCallback, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Pokemon } from "../../types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonCarouselProps {
  pokemons: Pokemon[];
  onPokemonClick?: (pokemon: Pokemon) => void;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

const CARD_WIDTH = 280;
const CARD_GAP = 16;
const FOCUSED_SCALE = 1.15;
const NORMAL_SCALE = 0.9;

export function PokemonCarousel({
  pokemons,
  onPokemonClick,
  onLoadMore,
  isLoadingMore = false,
}: PokemonCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Atualizar índice inicial quando pokémons são carregados pela primeira vez
  useEffect(() => {
    if (pokemons.length > 0 && pokemons.length >= 5 && currentIndex === 0) {
      const initialIndex = Math.min(4, Math.floor(pokemons.length / 2));
      setCurrentIndex(initialIndex);
    }
  }, [pokemons.length, currentIndex]);

  // Scroll para o card atual
  useEffect(() => {
    if (containerRef.current && pokemons.length > 0) {
      const paddingLeft = 80; // paddingLeft do container
      const scrollPosition =
        currentIndex * (CARD_WIDTH + CARD_GAP) +
        paddingLeft -
        (containerRef.current.clientWidth / 2 - CARD_WIDTH / 2);

      containerRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  }, [currentIndex, pokemons.length]);

  // Carregar mais quando perto dos últimos 10
  useEffect(() => {
    if (
      currentIndex >= pokemons.length - 10 &&
      onLoadMore &&
      !isLoadingMore &&
      pokemons.length > 0
    ) {
      onLoadMore();
    }
  }, [currentIndex, pokemons.length, onLoadMore, isLoadingMore]);

  // Resetar para o meio quando novos pokémons são carregados
  useEffect(() => {
    if (pokemons.length >= 10 && currentIndex < 5) {
      setCurrentIndex(4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < pokemons.length - 1 ? prev + 1 : prev));
  }, [pokemons.length]);

  // Detectar scroll manual e atualizar índice
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const newIndex = Math.round(
          scrollLeft / (CARD_WIDTH + CARD_GAP) +
            (containerRef.current.clientWidth / 2 - CARD_WIDTH / 2) /
              (CARD_WIDTH + CARD_GAP),
        );
        const clampedIndex = Math.max(
          0,
          Math.min(newIndex, pokemons.length - 1),
        );
        setCurrentIndex(clampedIndex);
      }
    }, 100);
  }, [pokemons.length]);

  if (pokemons.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          borderRadius: "20px",
          position: "relative",
          overflow: "visible",
          py: 2,
        }}
      >
        {/* Seta esquerda */}
        <IconButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            borderRadius: "20px",
            width: 56,
            height: 56,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.85)"
                : "rgba(255, 255, 255, 0.95)",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 1)"
                  : "rgba(255, 255, 255, 1)",
              boxShadow: 6,
            },
            "&.Mui-disabled": {
              opacity: 0.3,
            },
            "& svg": {
              fontSize: "2rem",
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Seta direita */}
        <IconButton
          onClick={handleNext}
          disabled={currentIndex === pokemons.length - 1}
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            borderRadius: "20px",
            width: 56,
            height: 56,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.85)"
                : "rgba(255, 255, 255, 0.95)",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 1)"
                  : "rgba(255, 255, 255, 1)",
              boxShadow: 6,
            },
            "&.Mui-disabled": {
              opacity: 0.3,
            },
            "& svg": {
              fontSize: "2rem",
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        {/* Container de scroll */}
        <Box
          ref={containerRef}
          onScroll={handleScroll}
          sx={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            paddingLeft: "80px",
            paddingRight: "80px",
            py: 4,
            minHeight: "500px",
            alignItems: "center",
          }}
        >
          {pokemons.map((pokemon, index) => {
            const isFocused = index === currentIndex;
            const scale = isFocused ? FOCUSED_SCALE : NORMAL_SCALE;
            const opacity = isFocused ? 1 : 0.7;

            return (
              <Box
                key={`${pokemon.id}-${index}`}
                sx={{
                  flexShrink: 0,
                  width: `${CARD_WIDTH}px`,
                  transform: `scale(${scale})`,
                  opacity,
                  transition: "transform 0.15s ease, opacity 0.15s ease",
                  cursor: "pointer",
                }}
              >
                <PokemonCard
                  pokemon={pokemon}
                  onClick={() => onPokemonClick?.(pokemon)}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
