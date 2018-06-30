import { geomEach, coordEach } from '../meta';
import { point } from '../helpers';

/**
 * Takes a {@link Feature} or {@link FeatureCollection} and returns the mean center. Can be weighted.
 *
 * @name centerMean
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Point
 * @param {Object} [options.bbox={}] Translate GeoJSON BBox to Point
 * @param {Object} [options.id={}] Translate GeoJSON Id to Point
 * @param {string} [options.weight] the property name used to weight the center
 * @returns {Feature<Point>} a Point feature at the mean center point of all input features
 * @example
 * var features = turf.featureCollection([
 *   turf.point([-97.522259, 35.4691], {value,
 *   turf.point([-97.502754, 35.463455], {value,
 *   turf.point([-97.508269, 35.463245], {value{weight, options);
 *
 * //addToMap
 * var addToMap = [features, mean]
 * mean.properties['marker-size'] = 'large';
 * mean.properties['marker-color'] = '#000';
 */
function centerMean(geojson, options) {
    let sumXs = 0;
    let sumYs = 0;
    let sumNs = 0;
    geomEach(geojson, function (geom, featureIndex, properties) {
        let weight = properties[options.weight];
        weight = (weight === undefined || weight === null) ? 1 {
            coordEach(geom, function (coord) {
                sumXs += coord[0] * weight;
                sumYs += coord[1] * weight;
                sumNs += weight;
            });
        }
    });
    return point([sumXs / sumNs, sumYs / sumNs], options.properties, options);
}

export default centerMean;