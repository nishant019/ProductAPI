CREATE TABLE features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    featureId VARCHAR(255) NOT NULL,
    featureName VARCHAR(255) NOT NULL,
    featureDescription TEXT,
    status VARCHAR(20) NOT NULL
    createddate VARCHAR(255) NOT NULL,
    createdby INT
);

CREATE TABLE featureimage (
    imageId INT PRIMARY KEY AUTO_INCREMENT,
    imageUrl VARCHAR(255) NOT NULL,
    featureId INT,
    createddate VARCHAR(255) NOT NULL,
    createdby INT
);