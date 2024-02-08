CREATE TABLE Users(
'uid' INTEGER,
'passwords' TEXT,
'FirstName' TEXT,
'LastName' TEXT,
PRIMARY KEY(uid)
);

CREATE TABLE UserFinance(
'finid' INTEGER AUTO_INCREMENT,
'uid' INTEGER,
'fingoal' DECIMAL(-8,8) NULL,
'agp' DECIMAL(-8,8),
'amb' DECIMAL(-8,8) NULL,
'dependent' BOOLEAN,
'dependents' INTEGER NULL,
PRIMARY KEY(finid),
FOREIGN KEY(uid) REFERENCES Users
);

Create Table TaxInfo(
'stateid' INTEGER,
'year' date,
'taxRate' DECIMAL(-8,8),
'dependentBreak' DECIMAL(-8,8) NULL,
PRIMARY KEY(stateid)
);
