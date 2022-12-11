-- Adminer 4.8.1 PostgreSQL 14.5 (Debian 14.5-1.pgdg110+1) dump
-- Credits: Leonardo Deorce Lima de Oliveira and Rodrigo Laiola Guimaraes

DROP TABLE IF EXISTS "answertable" CASCADE;
CREATE TABLE "public"."answertable" (
    "contestnumber" integer NOT NULL,
    "answernumber" integer NOT NULL,
    "runanswer" character varying(50) NOT NULL,
    "yes" boolean DEFAULT false NOT NULL,
    "fake" boolean DEFAULT false NOT NULL,
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "answer_index" UNIQUE ("contestnumber", "answernumber"),
    CONSTRAINT "answer_pkey" PRIMARY KEY ("contestnumber", "answernumber")
) WITH (oids = false);

DROP TABLE IF EXISTS "bkptable" CASCADE;
CREATE TABLE "public"."bkptable" (
    "contestnumber" integer NOT NULL,
    "sitenumber" integer NOT NULL,
    "bkpnumber" integer NOT NULL,
    "usernumber" integer NOT NULL,
    "bkpdate" integer NOT NULL,
    "bkpfilename" character varying(200) NOT NULL,
    "bkpdata" oid NOT NULL,
    "bkpstatus" character varying(50) NOT NULL,
    "bkpsize" integer NOT NULL,
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "bkp_index" UNIQUE ("contestnumber", "sitenumber", "bkpnumber"),
    CONSTRAINT "bkp_pkey" PRIMARY KEY ("contestnumber", "sitenumber", "bkpnumber")
) WITH (oids = false);

CREATE INDEX "bkp_index2" ON "public"."bkptable" USING btree ("contestnumber", "sitenumber", "usernumber");

DROP TABLE IF EXISTS "clartable" CASCADE;
CREATE TABLE "public"."clartable" (
    "contestnumber" integer NOT NULL,
    "clarsitenumber" integer NOT NULL,
    "clarnumber" integer NOT NULL,
    "usernumber" integer NOT NULL,
    "clardate" integer NOT NULL,
    "clardatediff" integer NOT NULL,
    "clardatediffans" integer NOT NULL,
    "clarproblem" integer NOT NULL,
    "clardata" text NOT NULL,
    "claranswer" text,
    "clarstatus" character varying(20) NOT NULL,
    "clarjudge" integer,
    "clarjudgesite" integer,
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "clar_index" UNIQUE ("contestnumber", "clarsitenumber", "clarnumber"),
    CONSTRAINT "clar_pkey" PRIMARY KEY ("contestnumber", "clarsitenumber", "clarnumber")
) WITH (oids = false);

CREATE INDEX "clar_index2" ON "public"."clartable" USING btree ("contestnumber", "clarsitenumber", "usernumber");

DROP TABLE IF EXISTS "contesttable" CASCADE;
CREATE TABLE "public"."contesttable" (
    "contestnumber" integer NOT NULL,
    "contestname" character varying(100) NOT NULL,
    "conteststartdate" integer NOT NULL,
    "contestduration" integer NOT NULL,
    "contestlastmileanswer" integer,
    "contestlastmilescore" integer,
    "contestlocalsite" integer NOT NULL,
    "contestpenalty" integer NOT NULL,
    "contestmaxfilesize" integer NOT NULL,
    "contestactive" boolean NOT NULL,
    "contestmainsite" integer NOT NULL,
    "contestkeys" text NOT NULL,
    "contestunlockkey" character varying(100) NOT NULL,
    "contestmainsiteurl" character varying(200) NOT NULL,
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "contest_pkey" PRIMARY KEY ("contestnumber"),
    CONSTRAINT "contestnumber_index" UNIQUE ("contestnumber")
) WITH (oids = false);

DROP TABLE IF EXISTS "langtable" CASCADE;
CREATE TABLE "public"."langtable" (
    "contestnumber" integer NOT NULL,
    "langnumber" integer NOT NULL,
    "langname" character varying(50) NOT NULL,
    "langextension" character varying(20) NOT NULL,
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "lang_pkey" PRIMARY KEY ("contestnumber", "langnumber")
) WITH (oids = false);

CREATE INDEX "lang_index" ON "public"."langtable" USING btree ("contestnumber", "langnumber");

CREATE INDEX "lang_index2" ON "public"."langtable" USING btree ("contestnumber", "langname");

DROP TABLE IF EXISTS "logtable" CASCADE;
DROP SEQUENCE IF EXISTS logtable_lognumber_seq CASCADE;
CREATE SEQUENCE logtable_lognumber_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."logtable" (
    "lognumber" integer DEFAULT nextval('logtable_lognumber_seq') NOT NULL,
    "contestnumber" integer NOT NULL,
    "sitenumber" integer NOT NULL,
    "loguser" integer,
    "logip" character varying(20) NOT NULL,
    "logdate" integer NOT NULL,
    "logtype" character varying(20) NOT NULL,
    "logdata" text NOT NULL,
    "logstatus" character varying(20) DEFAULT '',
    CONSTRAINT "log_pkey" PRIMARY KEY ("lognumber")
) WITH (oids = false);

CREATE INDEX "log_index" ON "public"."logtable" USING btree ("contestnumber", "sitenumber", "logdate");

CREATE INDEX "log_index2" ON "public"."logtable" USING btree ("contestnumber", "loguser", "sitenumber");


DROP TABLE IF EXISTS "problemtable" CASCADE;
CREATE TABLE "public"."problemtable" (
    "contestnumber" integer NOT NULL,
    "problemnumber" integer NOT NULL,
    "workingnumber" integer NOT NULL,
    "problemname" character varying(20) NOT NULL,
    "problemfullname" character varying(100) DEFAULT '',
    "problembasefilename" character varying(100),
    "probleminputfilename" character varying(100) DEFAULT '',
    "probleminputfile" oid,
    "probleminputfilehash" character varying(50),
    "fake" boolean DEFAULT false NOT NULL,
    "problemcolorname" character varying(100) DEFAULT '',
    "problemcolor" character varying(6) DEFAULT '',
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "problem_index" UNIQUE ("contestnumber", "problemnumber"),
    CONSTRAINT "problem_pkey" PRIMARY KEY ("contestnumber", "problemnumber")
) WITH (oids = false);

CREATE INDEX "problem_index2" ON "public"."problemtable" USING btree ("contestnumber", "problemname");

DROP TABLE IF EXISTS "runtable" CASCADE;
CREATE TABLE "public"."runtable" (
    "contestnumber" integer NOT NULL,
    "runsitenumber" integer NOT NULL,
    "runnumber" integer NOT NULL,
    "usernumber" integer NOT NULL,
    "rundate" integer NOT NULL,
    "rundatediff" integer NOT NULL,
    "rundatediffans" integer NOT NULL,
    "runproblem" integer NOT NULL,
    "runfilename" character varying(200) NOT NULL,
    "rundata" oid NOT NULL,
    "runanswer" integer DEFAULT '0' NOT NULL,
    "runstatus" character varying(20) NOT NULL,
    "runjudge" integer,
    "runjudgesite" integer,
    "runanswer1" integer DEFAULT '0' NOT NULL,
    "runjudge1" integer,
    "runjudgesite1" integer,
    "runanswer2" integer DEFAULT '0' NOT NULL,
    "runjudge2" integer,
    "runjudgesite2" integer,
    "runlangnumber" integer NOT NULL,
    "autoip" character varying(20) DEFAULT '',
    "autobegindate" integer,
    "autoenddate" integer,
    "autoanswer" text DEFAULT '',
    "autostdout" oid,
    "autostderr" oid,
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "run_index" UNIQUE ("contestnumber", "runsitenumber", "runnumber"),
    CONSTRAINT "run_pkey" PRIMARY KEY ("contestnumber", "runsitenumber", "runnumber")
) WITH (oids = false);

CREATE INDEX "run_index2" ON "public"."runtable" USING btree ("contestnumber", "runsitenumber", "usernumber");

DROP TABLE IF EXISTS "sitetable" CASCADE;
CREATE TABLE "public"."sitetable" (
    "contestnumber" integer NOT NULL,
    "sitenumber" integer NOT NULL,
    "siteip" character varying(200) NOT NULL,
    "sitename" character varying(50) NOT NULL,
    "siteactive" boolean NOT NULL,
    "sitepermitlogins" boolean NOT NULL,
    "sitelastmileanswer" integer,
    "sitelastmilescore" integer,
    "siteduration" integer,
    "siteautoend" boolean,
    "sitejudging" text,
    "sitetasking" text,
    "siteglobalscore" character varying(50) DEFAULT '' NOT NULL,
    "sitescorelevel" integer DEFAULT '0' NOT NULL,
    "sitenextuser" integer DEFAULT '0' NOT NULL,
    "sitenextclar" integer DEFAULT '0' NOT NULL,
    "sitenextrun" integer DEFAULT '0' NOT NULL,
    "sitenexttask" integer DEFAULT '0' NOT NULL,
    "sitemaxtask" integer DEFAULT '8' NOT NULL,
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    "sitechiefname" character varying(20) DEFAULT '' NOT NULL,
    "siteautojudge" boolean DEFAULT false,
    "sitemaxruntime" integer DEFAULT '600' NOT NULL,
    "sitemaxjudgewaittime" integer DEFAULT '900' NOT NULL,
    CONSTRAINT "site_index" UNIQUE ("contestnumber", "sitenumber"),
    CONSTRAINT "site_pkey" PRIMARY KEY ("contestnumber", "sitenumber")
) WITH (oids = false);

DROP TABLE IF EXISTS "sitetimetable" CASCADE;
CREATE TABLE "public"."sitetimetable" (
    "contestnumber" integer NOT NULL,
    "sitenumber" integer NOT NULL,
    "sitestartdate" integer NOT NULL,
    "siteenddate" integer NOT NULL,
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "sitetime_index" UNIQUE ("contestnumber", "sitenumber", "sitestartdate"),
    CONSTRAINT "sitetime_pkey" PRIMARY KEY ("contestnumber", "sitenumber", "sitestartdate")
) WITH (oids = false);

CREATE INDEX "sitetimesite_index" ON "public"."sitetimetable" USING btree ("contestnumber", "sitenumber");

DROP TABLE IF EXISTS "tasktable" CASCADE;
CREATE TABLE "public"."tasktable" (
    "contestnumber" integer NOT NULL,
    "sitenumber" integer NOT NULL,
    "usernumber" integer NOT NULL,
    "tasknumber" integer NOT NULL,
    "taskstaffnumber" integer,
    "taskstaffsite" integer,
    "taskdate" integer NOT NULL,
    "taskdatediff" integer NOT NULL,
    "taskdatediffans" integer NOT NULL,
    "taskdesc" character varying(200),
    "taskfilename" character varying(100),
    "taskdata" oid,
    "tasksystem" boolean NOT NULL,
    "taskstatus" character varying(20) NOT NULL,
    "colorname" character varying(100) DEFAULT '',
    "color" character varying(6) DEFAULT '',
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    CONSTRAINT "task_index" UNIQUE ("contestnumber", "sitenumber", "tasknumber"),
    CONSTRAINT "task_pkey" PRIMARY KEY ("contestnumber", "sitenumber", "tasknumber")
) WITH (oids = false);

DROP TABLE IF EXISTS "usertable" CASCADE;
CREATE TABLE "public"."usertable" (
    "contestnumber" integer NOT NULL,
    "usersitenumber" integer NOT NULL,
    "usernumber" integer NOT NULL,
    "username" character varying(20) NOT NULL,
    "userfullname" character varying(200) NOT NULL,
    "userdesc" character varying(300),
    "usertype" character varying(20) NOT NULL,
    "userenabled" boolean DEFAULT true NOT NULL,
    "usermultilogin" boolean DEFAULT false NOT NULL,
    "userpassword" character varying(200) DEFAULT '',
    "userip" character varying(300),
    "userlastlogin" integer,
    "usersession" character varying(50) DEFAULT '',
    "usersessionextra" character varying(50) DEFAULT '',
    "userlastlogout" integer,
    "userpermitip" character varying(300),
    "userinfo" character varying(300) DEFAULT '',
    "updatetime" integer DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    "usericpcid" character varying(50) DEFAULT '',
    CONSTRAINT "user_index" UNIQUE ("contestnumber", "usersitenumber", "usernumber"),
    CONSTRAINT "user_index2" UNIQUE ("contestnumber", "usersitenumber", "username"),
    CONSTRAINT "user_pkey" PRIMARY KEY ("contestnumber", "usersitenumber", "usernumber")
) WITH (oids = false);

DROP TABLE IF EXISTS "workingtable" CASCADE;
CREATE TABLE public.workingtable (
	contestnumber int4 NOT NULL,
	workingnumber int4 NOT NULL,
	workingname varchar(100) NOT NULL,
	workingstartdate int4 NOT NULL,
	workingenddate int4 NOT NULL,
	workinglastanswerdate int4 NULL,
	workingmaxfilesize int4 NOT NULL,
	workingismultilogin bool NOT NULL,
	createdat int4 NOT NULL,
	updatedat int4 NOT NULL,
	deletedat int4 NULL,
	CONSTRAINT workingtable_pk PRIMARY KEY (contestnumber, workingnumber)
);

DROP TABLE IF EXISTS "problemlangtable" CASCADE;
CREATE TABLE public.problemlangtable (
	contestnumber int4 NOT NULL,
	problemnumber int4 NOT NULL,
	langnumber int4 NOT NULL,
	CONSTRAINT problemlangtable_pk PRIMARY KEY (contestnumber, problemnumber, langnumber)
);

DROP TABLE IF EXISTS "workingusertable" CASCADE;
CREATE TABLE public.workingusertable (
	contestnumber int4 NOT NULL,
	workingnumber int4 NOT NULL,
	sitenumber int4 NOT NULL,
	usernumber int4 NOT NULL,
	CONSTRAINT workingusertable_pk PRIMARY KEY (contestnumber, workingnumber, sitenumber, usernumber)
);

ALTER TABLE ONLY "public"."answertable" ADD CONSTRAINT "contest_fk" FOREIGN KEY (contestnumber) REFERENCES contesttable(contestnumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."bkptable" ADD CONSTRAINT "user_fk" FOREIGN KEY (contestnumber, sitenumber, usernumber) REFERENCES usertable(contestnumber, usersitenumber, usernumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."clartable" ADD CONSTRAINT "problem_fk" FOREIGN KEY (contestnumber, clarproblem) REFERENCES problemtable(contestnumber, problemnumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."clartable" ADD CONSTRAINT "user_fk" FOREIGN KEY (contestnumber, clarsitenumber, usernumber) REFERENCES usertable(contestnumber, usersitenumber, usernumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."langtable" ADD CONSTRAINT "contest_fk" FOREIGN KEY (contestnumber) REFERENCES contesttable(contestnumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."logtable" ADD CONSTRAINT "loguser" FOREIGN KEY (contestnumber, loguser, sitenumber) REFERENCES usertable(contestnumber, usernumber, usersitenumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."logtable" ADD CONSTRAINT "site_fk" FOREIGN KEY (contestnumber, sitenumber) REFERENCES sitetable(contestnumber, sitenumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."problemtable" ADD CONSTRAINT "contest_fk" FOREIGN KEY (contestnumber) REFERENCES contesttable(contestnumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."problemtable" ADD CONSTRAINT "workingtable_fk" FOREIGN KEY (contestnumber,workingnumber) REFERENCES workingtable(contestnumber,workingnumber) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."runtable" ADD CONSTRAINT "answer_fk" FOREIGN KEY (contestnumber, runanswer) REFERENCES answertable(contestnumber, answernumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."runtable" ADD CONSTRAINT "lang_fk" FOREIGN KEY (contestnumber, runlangnumber) REFERENCES langtable(contestnumber, langnumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."runtable" ADD CONSTRAINT "problem_fk" FOREIGN KEY (contestnumber, runproblem) REFERENCES problemtable(contestnumber, problemnumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."runtable" ADD CONSTRAINT "user_fk" FOREIGN KEY (contestnumber, runsitenumber, usernumber) REFERENCES usertable(contestnumber, usersitenumber, usernumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."sitetable" ADD CONSTRAINT "contest_fk" FOREIGN KEY (contestnumber) REFERENCES contesttable(contestnumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."sitetimetable" ADD CONSTRAINT "site_fk" FOREIGN KEY (contestnumber, sitenumber) REFERENCES sitetable(contestnumber, sitenumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."tasktable" ADD CONSTRAINT "user_fk" FOREIGN KEY (contestnumber, sitenumber, usernumber) REFERENCES usertable(contestnumber, usersitenumber, usernumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."usertable" ADD CONSTRAINT "site_fk" FOREIGN KEY (contestnumber, usersitenumber) REFERENCES sitetable(contestnumber, sitenumber) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE public.problemlangtable ADD CONSTRAINT problemlangtable_fk FOREIGN KEY (contestnumber,problemnumber) REFERENCES public.problemtable(contestnumber,problemnumber);
ALTER TABLE public.problemlangtable ADD CONSTRAINT problemlangtable_fk_1 FOREIGN KEY (contestnumber,langnumber) REFERENCES public.langtable(contestnumber,langnumber);

ALTER TABLE public.workingusertable ADD CONSTRAINT workingusertable_fk FOREIGN KEY (contestnumber,workingnumber) REFERENCES public.workingtable(contestnumber,workingnumber);
ALTER TABLE public.workingusertable ADD CONSTRAINT workingusertable_fk_1 FOREIGN KEY (contestnumber,sitenumber,usernumber) REFERENCES public.usertable(contestnumber,usersitenumber,usernumber);