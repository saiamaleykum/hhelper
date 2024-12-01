import json
import hashlib


def normalize_value(value):
    if isinstance(value, str):
        return " ".join(value.strip().lower().split())
    # if isinstance(value, dict):
    #     return {k: normalize_value(v) for k, v in value.items()}
    # if isinstance(value, list):
    #     return [normalize_value(v) for v in value]
    return value


def normalize_parameters(parameters: dict):
    return {key: normalize_value(value) for key, value in parameters.items()}


def get_hash(parameters: dict):
    normalized_parameters = normalize_parameters(parameters)
    json_parameters = json.dumps(normalized_parameters, sort_keys=True)
    hash_parameters = hashlib.sha256(json_parameters.encode()).hexdigest()
    return hash_parameters



# data1 = {
#     "area": "1002",
#     "text": "python middle"
# }

# data2 = {
#     "text": "Python MIDDLE      ",
#     "area": "1002"
# }

# data3 = {
#     "area": "1002",
#     "text": "                        python middle "
# }

# data4 = {
#     "text": "python       middle",
#     "area": "1002"
# }


# print(get_hash(data1))
# print(get_hash(data2))
# print(get_hash(data3))
# print(get_hash(data4))





