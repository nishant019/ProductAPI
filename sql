CREATE TABLE features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    featureId VARCHAR(255) NOT NULL,
    featureName VARCHAR(255) NOT NULL,
    featureDescription TEXT,
    status VARCHAR(20) NOT NULL
    createddate VARCHAR(255) NOT NULL,
    createdby INT,
    updateddate VARCHAR(255) NOT NULL,
    updatedby INT
);

CREATE TABLE featureimage (
    imageId INT PRIMARY KEY AUTO_INCREMENT,
    imageUrl VARCHAR(255) NOT NULL,
    featureId INT,
    createddate VARCHAR(255) NOT NULL,
    createdby INT
);

CREATE TABLE additionalfields( fieldId INT PRIMARY KEY, fieldName VARCHAR(255) NOT NULL, createdby VARCHAR(100), createddate VARCHAR(255), updatedby VARCHAR(100), updateddate VARCHAR(255) );

CREATE TABLE CategoryAdditionalFieldMapping (
    categoryId INT,
    fieldId INT,
    value VARCHAR(255),
    createdby VARCHAR(100),
    createddate VARCHAR(255),
    updatedby VARCHAR(100),
    updateddate VARCHAR(255)
);



SELECT c.*, cafm.fieldId, af.fieldName, caf.childFieldTitle FROM category c 
    LEFT JOIN categoryadditionalfieldmapping cafm ON c.categoryId = cafm.categoryId 
    LEFT JOIN additionalfields af ON cafm.fieldId=af.fieldId 
    LEFT JOIN childadditionalfield caf ON caf.parentFieldId=af.fieldId;