import { Box, Paper, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { EvolutionNode } from "../../../types/pokemon";

interface PokemonEvolutionChainProps {
  evolutionChain: EvolutionNode;
}

interface EvolutionNodeComponentProps {
  node: EvolutionNode;
}

function EvolutionNodeComponent({ node }: EvolutionNodeComponentProps) {
  const navigate = useNavigate();

  // Verificações de segurança
  if (!node || !node.pokemon) {
    return null;
  }

  const { pokemon, evolution_text, evolves_to = [] } = node;

  const handlePokemonClick = () => {
    if (pokemon.name) {
      navigate(`/pokemon/${pokemon.name}/`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Sprite, nome e evolution text */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handlePokemonClick}
      >
        {/* Sprite do pokémon */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: "20px",
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
            minWidth: "120px",
            transition: "elevation 0.2s ease-in-out",
            "&:hover": {
              elevation: 4,
            },
          }}
        >
          <Box
            component="img"
            src={pokemon.sprites?.default || ""}
            alt={pokemon.name || "Pokémon"}
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </Paper>

        {/* Nome do pokémon */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          {pokemon.name || "Unknown"}
        </Typography>

        {/* Evolution text */}
        {evolution_text && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textAlign: "center",
              maxWidth: "150px",
              fontSize: "0.75rem",
            }}
          >
            {evolution_text}
          </Typography>
        )}
      </Box>

      {/* Evoluções seguintes */}
      {evolves_to && evolves_to.length > 0 && (
        <>
          {/* Flecha */}
          <ArrowForwardIcon
            sx={{
              color: "text.secondary",
              fontSize: "2rem",
              flexShrink: 0,
            }}
          />
          {/* Container para múltiplas evoluções (bifurcação) */}
          {evolves_to.length > 1 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                position: "relative",
              }}
            >
              {evolves_to.map((evolvesTo, index) => {
                if (!evolvesTo || !evolvesTo.pokemon) {
                  return null;
                }
                return (
                  <EvolutionNodeComponent
                    key={`${evolvesTo.pokemon.id || index}-${index}`}
                    node={evolvesTo}
                  />
                );
              })}
            </Box>
          ) : (
            // Apenas uma evolução - continua horizontalmente
            evolves_to[0] && <EvolutionNodeComponent node={evolves_to[0]} />
          )}
        </>
      )}
    </Box>
  );
}

export function PokemonEvolutionChain({
  evolutionChain,
}: PokemonEvolutionChainProps) {
  // Verificação de segurança antes de renderizar
  if (!evolutionChain || !evolutionChain.pokemon) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Cadeia de Evolução
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "center" },
          alignItems: "center",
          overflowX: "auto",
          overflowY: "hidden",
          py: 2,
          width: "100%",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 0, 0, 0.3)",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.5)"
                  : "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: "fit-content",
            px: { xs: 2, md: 0 },
          }}
        >
          <EvolutionNodeComponent node={evolutionChain} />
        </Box>
      </Box>
    </Box>
  );
}
