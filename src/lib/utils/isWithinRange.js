// range = in meter 
function isWithinRange(range, office_coords, emp_coords) {
  // Radius of the Earth in kilometers
  const R = 6371.0;

  // Convert degrees to radians
  const lat1_rad = +office_coords.latitude * (Math.PI / 180);
  const lon1_rad = +office_coords.longitude * (Math.PI / 180);
  const lat2_rad = emp_coords.latitude * (Math.PI / 180);
  const lon2_rad = emp_coords.longitude * (Math.PI / 180);

  // Differences
  const dlat = lat2_rad - lat1_rad;
  const dlon = lon2_rad - lon1_rad;

  // Haversine formula
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1_rad) *
      Math.cos(lat2_rad) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = R * c;

  // Convert to meters and check if within 100 meters
  return distance * 1000 <= range;
}

export default isWithinRange;
