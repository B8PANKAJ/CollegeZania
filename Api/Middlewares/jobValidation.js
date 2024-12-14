const jobValidation = (req, res, next) => {
  const {
    companyName,
    jobTitle,
    experienceRequired,
    salaryRangeMin,
    salaryRangeMax,
    city,
    description,
    requirements,
  } = req.body;

  const missingFields = [];

  // Check required string fields with trim to handle empty strings
  if (!companyName?.trim()) missingFields.push("Company Name");
  if (!jobTitle?.trim()) missingFields.push("Job Title");
  if (!city?.trim()) missingFields.push("City");
  if (!description?.trim()) missingFields.push("Description");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Validate requirements array
  if (!Array.isArray(requirements) || requirements.length === 0) {
    return res.status(400).json({
      message: "At least one job requirement is required",
    });
  }

  // Validate numeric fields
  const numericFields = {
    experienceRequired,
    salaryRangeMin,
    salaryRangeMax,
  };

  const invalidNumericFields = Object.entries(numericFields)
    .filter(([_, value]) => isNaN(value) || value === "")
    .map(([key]) => key);

  if (invalidNumericFields.length > 0) {
    return res.status(400).json({
      message: `Invalid numeric values for: ${invalidNumericFields.join(", ")}`,
    });
  }

  // Clean the data before passing it to the next middleware
  req.body.description = description.trim();
  req.body.companyName = companyName.trim();
  req.body.jobTitle = jobTitle.trim();
  req.body.city = city.trim();

  next();
};

module.exports = jobValidation;
