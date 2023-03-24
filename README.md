# angular_docs


3.mysql 환경설정 편집
(3-1) [mysqld] 수정
	vi /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld] 에 추가
innodb_log_buffer_size=128M
bulk_insert_buffer_size=256M
character-set-client-handshake=false
init_connect="SET collation_connection=utf8_general_ci"
init_connect="SET NAMES utf8"
character-set-server=utf8
collation-server=utf8_general_ci
lower_case_table_names=1
bind-address = 127.0.0.1 주석처리[맨앞 #추가]

*맨마지막줄에추가( mysql에서  테이블 AS 설정 에러 해결)
sql_mode 
="STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
* 한줄로 작성 엔터치면 에러발생.

(3-2) [mysql] 수정
vi /etc/mysql/conf.d/mysql.cnf
[mysql] 에 추가
default-character-set=utf8
재시작
sudo /etc/init.d/mysql restart