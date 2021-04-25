import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://www.strava.com/api/v3'
})
export interface DataProps {
	biggest_ride_distance: number;
	biggest_run_distance: number;
	biggest_swim_distance: number;
	all_ride_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	all_run_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	all_swim_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	biggest_climb_elevation_gain: number | null;
	recent_ride_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	recent_run_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	recent_swim_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	ytd_ride_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	ytd_run_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	ytd_swim_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
}