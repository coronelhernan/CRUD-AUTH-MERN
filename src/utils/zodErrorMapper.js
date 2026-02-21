export function mapZodErrors(issues = []) {
  return issues.map(issue => {
    const field = issue.path[0];

    // Normalizamos el mensaje según el tipo de error
    let message = issue.message;

    if (issue.message.includes("received undefined")) {
      message = `${field} is required`;
    } 
    else if (issue.message.includes("received boolean")) {
      message = `${field} must be a string`;
    }
    else if (issue.message.includes("received number")) {
      message = `${field} must be a string`;
    }

    return {
      field,
      message
    };
  });
}