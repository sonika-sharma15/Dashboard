import json

# Load the JSON data from file with UTF-8 encoding and ignore errors
with open('jsondata.json', 'r', encoding='utf-8', errors='ignore') as f:
    data = json.load(f)

# Function to determine the SWOT value based on some condition
def determine_swot(entry):
    try:
        intensity = int(entry['intensity'])  # Convert intensity to integer
    except (ValueError, TypeError):
        intensity = 0  # Default to 0 if conversion fails

    if intensity > 7:  # Condition for "Strength"
        return "Strength"
    elif intensity < 4:  # Condition for "Weakness"
        return "Weakness"
    elif entry['topic'] == 'AI':  # Condition for "Opportunity"
        return "Opportunity"
    else:  # Default to "Threat"
        return "Threat"

# Add the SWOT field to each entry
for entry in data:
    entry['swot'] = determine_swot(entry)

# Save the updated JSON data back to the file with UTF-8 encoding
with open('jsondata_with_swot.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print("SWOT field added to JSON data successfully!")
