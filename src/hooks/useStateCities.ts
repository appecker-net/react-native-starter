import {useQuery} from '@tanstack/react-query';
import {useREST} from './useREST';
import {useMemo} from 'react';

export type StateResponseModel = {
  ID: string;
  STATE_CODE: string;
  STATE_NAME: string;
};

export type CitiesResponseModel = {
  ID: string;
  ID_STATE: string;
  CITY: string;
  COUNTY: string;
  LATITUDE: string;
  LONGITUDE: string;
};

export const useStateCities = ({state}: {state?: string}) => {
  const {get} = useREST({endPoint: ''});

  const {data: statesData, isLoading} = useQuery({
    queryKey: ['states'],
    queryFn: () => get<StateResponseModel[]>(`/states`),
  });

  const {data: citiesData, isLoading: isLoadingCities} = useQuery({
    queryKey: ['cities', {id: state}],
    queryFn: () => get<CitiesResponseModel[]>(`/cities/${state}`),
    enabled: !!state,
  });

  const states = useMemo(() => {
    return statesData?.data?.map(s => ({key: s.ID, title: s.STATE_NAME})) || [];
  }, [statesData]);

  const cities = useMemo(() => {
    return citiesData?.data?.map(s => ({key: s.ID, title: s.CITY})) || [];
  }, [citiesData]);

  return {
    states,
    cities,
    loading: isLoading || isLoadingCities,
  };
};
