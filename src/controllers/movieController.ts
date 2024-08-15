import { Request, Response } from 'express';
import axios from 'axios';

const BASE_URL: string = 'https://api.themoviedb.org/3';


// Interface
interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    original_title: string;
    genre_ids: number[];
    backdrop_path: string;
    vote_average: number;
}

interface ApiResponse {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}

interface GetMoviesQuery {
    page?: string;
    primary_release_year?: string;
    primary_release_date_gte?: string;
    primary_release_date_lte?: string; 
}

// Função para buscar filmes com filtro por data
export const getMovies = async (req: Request<{}, {}, {}, GetMoviesQuery>, res: Response): Promise<void> => {
    try {
        const API_KEY: string = process.env.API_KEY || '';
        const {
            page = '1',
            primary_release_year,
            primary_release_date_gte,
            primary_release_date_lte
        } = req.query;

        const params: Record<string, string> = {
            include_adult: 'false',
            include_video: 'false',
            language: 'pt-br',
            page,
            sort_by: 'popularity.desc'
        };

        if (primary_release_date_gte) {
            params['primary_release_date.gte'] = primary_release_date_gte;
        }
        if (primary_release_date_lte) { 
            params['primary_release_date.lte'] = primary_release_date_lte;
        }
        if (primary_release_year) {
            params['primary_release_year'] = primary_release_year;
        }

        const { data } = await axios.get<ApiResponse>(`${BASE_URL}/discover/movie`, {
            headers: { Authorization: `Bearer ${API_KEY}` },
            params
        });

        const response = {
            filmes: data.results.map(filme => ({
                id: filme.id,
                titulo: filme.title,
                data_lancamento: filme.release_date,
                resumo: filme.overview,
                titulo_original: filme.original_title,
                ids_genero: filme.genre_ids,
                imagem: filme.backdrop_path,
                media_avaliacao: filme.vote_average
            })),
            pagina: data.page,
            total_resultados: data.total_results,
            total_paginas: data.total_pages
        };

        res.json(response);
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro ao buscar filmes', error.message);
            console.error('Detalhes do erro:', error.response ? error.response.data : error.message);
        } else {
            console.error('Erro inesperado:', error);
        }

        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
};
