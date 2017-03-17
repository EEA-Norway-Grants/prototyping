select distinct dpp_nuts source, pprom_nuts target, count(*) from (

select substr(dpp_org.nuts, 0, 4) dpp_nuts, substr(pprom_org.nuts, 0, 4) pprom_nuts
from
  dv_organisation dpp_org, dv_organisation pprom_org,
  dv_organisationrole dpp_role, dv_organisationrole pprom_role, dv_programme prg
where 
  dpp_role.project_id is not null and dpp_role.role = 'donor project partner' and
  pprom_role.project_id is not null and pprom_role.role = 'project promoter' and
  dpp_role.project_id = pprom_role.project_id and 
  dpp_org.id = dpp_role.organisation_id and
  pprom_org.id = pprom_role.organisation_id and 
  dpp_nuts != '' and pprom_nuts != ''
  and dpp_role.programme_id = prg.code and pprom_role.programme_id = prg.code
  and prg.code not in ('BG09', 'CZ07', 'EE10', 'ES07', 'HU08', 'LT08', 'LV05', 'PL10', 'RO15', 'SI04', 'SK06', 'CZ07', 'EE10', 'LV05', 'PL10', 'SI04')

) group by dpp_nuts, pprom_nuts;
