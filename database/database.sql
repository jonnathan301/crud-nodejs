-- Database: Personas

-- DROP DATABASE "Personas";

CREATE DATABASE "Personas"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
    
   
create table Person 
(
	id int GENERATED ALWAYS AS IDENTITY
	,document_number varchar(50)
	,fullname	varchar(150)
	,birth 	date
	,document_number_father	 varchar(50)
	,document_number_mother	 varchar(50)
	,primary key (document_number)
	,constraint document_number_father_fk FOREIGN key (document_number_father)
	references Person(document_number)
	,constraint document_number_mother_fk FOREIGN key (document_number_mother)
	references Person(document_number)
);

insert into Person(document_number, fullname, birth, document_number_father, document_number_mother)
values ('000000', 'Dios', '01-01-2021', '000000', '000000')
		,('000001', 'Adan', '01-01-2021', '000000', '000000')
		,('000002', 'Eva', '01-01-2021', '000000', '000000')