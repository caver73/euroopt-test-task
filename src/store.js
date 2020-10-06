import { makeObservable, observable, computed, action, runInAction } from 'mobx'
import fetchAddressData from './utils/fetchAddressData'

const REGION = 'region'
const DISTRICT = 'district'
const CITY = 'city'
const STREET = 'street'

class Store {
    countries = []
    regions = []
    districts = []
    cities = []
    streets = []

    country = null
    region = null
    district = null
    city = null
    street = null

    constructor() {
        makeObservable(this, {
            countries: observable,
            country: observable,
            fetchCountries: action,
            selectCountry: action,
            listCountries: computed,
            selectedCountry: computed,

            regions: observable,
            region: observable,
            fetchRegions: action,
            selectRegion: action,
            listRegions: computed,
            selectedRegion: computed,

            districts: observable,
            district: observable,
            fetchDistricts: action,
            selectDistrict: action,
            listDistricts: computed,
            selectedDistrict: computed,

            cities: observable,
            city: observable,
            fetchCities: action,
            selectCity: action,
            listCities: computed,
            selectedCity: computed,

            streets: observable,
            street: observable,
            fetchStreets: action,
            selectStreet: action,
            listStreets: computed,
            selectedStreet: computed,
        })
        this.fetchCountries()
    }

    get listCountries() {
        return this.countries
    }

    get selectedCountry() {
        return this.country        
    }

    get listRegions() {
        return this.regions
    }

    get selectedRegion() {
        return this.region
    }

    get listDistricts() {
        return this.districts
    }

    get selectedDistrict() {
        return this.district
    }

    get listCities() {
        return this.cities
    }

    get selectedCity() {
        return this.city
    }

    get listStreets() {
        return this.streets
    }

    get selectedStreet() {
        return this.street
    }

    fetchCountries() {
        fetchAddressData('Addresses.Countries').then(countries => {
            runInAction(() => {
                this.countries = countries.map(country => ({ value: country.Address8Id, label: country.Address8Name }))
                if (this.countries.length === 1) {
                    this.selectCountry(this.countries[0])
                } else {
                    this.clearState(REGION)
                }
            })
        })
    }

    fetchRegions() {
        fetchAddressData('Addresses.Regions', { Address8Id: this.country.value }).then(regions => {
            runInAction(() => {
                this.regions = regions.map(region => ({ value: region.Address7Id, label: region.Address7Name }))
                if (this.regions.length === 1) {
                    this.selectRegion(this.regions[0])
                } else {
                    this.region = null
                    this.clearState(DISTRICT)
                }
            })
        })
    }

    fetchDistricts() {
        fetchAddressData('Addresses.Districts', { Address7Id: this.region.value }).then(districs => {
            runInAction(() => {
                this.districts = districs.map(district => ({ value: district.Address6Id, label: district.Address6Name }))
                if (this.districts.length === 1) {
                    this.selectDistrict(this.districts[0])
                } else {
                    this.district = null
                    this.clearState(CITY)
                }
            })
        })
    }

    fetchCities() {
        fetchAddressData('Addresses.Cities', { Address6Id: this.district.value }).then(cities => {
            runInAction(() => {
                this.cities = cities.map(city => ({ value: city.Address5Id, label: city.Address5Name }))
                if (this.cities.length === 1) {
                    this.selectCity(this.cities[0])
                } else {
                    this.city = null
                    this.clearState(STREET)
                }
            })

        })
    }

    fetchStreets() {
        fetchAddressData('Addresses.Streets', { Address5Id: this.city.value }).then(streets => {
            runInAction(() => {
                this.streets = streets.map(street => ({ value: street.Address4Id, label: street.Address4Name }))
                if (this.streets.length === 1) {
                    this.selectStreet(this.streets[0])
                } else {
                    this.street = null
                }
            })

        })
    }

    selectCountry(country) {
        this.country = country
        this.fetchRegions()
    }

    selectRegion(region) {
        this.region = region
        this.fetchDistricts()
    }

    selectDistrict(district) {
        this.district = district
        this.fetchCities()
    }

    selectCity(city) {
        this.city = city
        this.fetchStreets()
    }

    selectStreet(street) {
        this.street = street
    }

    clearState(level) {
        switch (level) {
            case REGION:
                this.region = null
                this.regions = []
            case DISTRICT:
                this.district = null
                this.districts = []
            case CITY:
                this.city = null
                this.cities = []
            case STREET:
                this.street = null
                this.streets = []
        }

    }

}

export default new Store()