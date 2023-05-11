colours_compare = [
    '#B80000', 
    '#EB0000', 
    '#FF453A', 
    'FFD230', 
    'FFD53C', 
    '387B12', 
    '#FFFFFF', 
    '#FEFEFE',
    '#F6F6F6',
    '#E6E8EA',
    '#B0B2B4',
    '#8A8C8E',
    '#545658',
    '#3A3C3E',
    '#202224',
    '#141618',
    '#141414',
    '#000000',
    '#0071F1',
    '#3092FF',
    '#0064E6',
    '#009E9E',
    '#00CCC7',
    '#006666',
    '#24B300',
    '#49CC29',
    '#148A00',
    '#FFB32B',
    '#FFCE2B',
    '#C8871E',
    '#F51A5A',
    '#FF4060',
    '#E4134F'
]

def hex_to_rgb(colour):
    colour = colour.lstrip('#')
    return tuple(int(colour[i:i+2], 16) for i in (0, 2, 4))

def euclidian_distance(colour):
    matrix = []
    hex_colour = hex_to_rgb(colour)
    for item in colours_compare:
        compare = hex_to_rgb(item)
        euclidian = 0.3*(compare[0]-hex_colour[0])**2+ 0.59*(compare[1]-hex_colour[1])**2 + 0.11*(compare[2]-hex_colour[2])**2
        matrix.append({"colour": item, "distance": euclidian})
    matrix = sorted(matrix, key=lambda d: d['distance'])
    return matrix

old_colour = "#D5D0CD"
new_colour = euclidian_distance(old_colour)[0]
print("Most similar to " + old_colour + " is "+ new_colour["colour"] + " with dissimilarity of " + str(round(new_colour["distance"])))