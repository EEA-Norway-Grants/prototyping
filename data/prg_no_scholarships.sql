select distinct dpp_nuts source, poper_nuts target, count(*) as count from (
select substr(dpp_org.nuts, 0, 4) dpp_nuts, substr(poper_org.nuts, 0, 4) poper_nuts, *
from
  dv_organisation dpp_org, dv_organisation poper_org,
  dv_organisationrole dpp_role, dv_organisationrole poper_role, dv_programme prg
where dpp_role.programme_id is not null and dpp_role.role = 'donor programme partner' and
      poper_role.programme_id is not null and poper_role.role = 'programme operator' and
      dpp_role.programme_id = poper_role.programme_id and
      dpp_org.id = dpp_role.organisation_id and
      poper_org.id = poper_role.organisation_id and
      dpp_role.programme_id = prg.code and poper_role.programme_id = prg.code
  and prg.code not in ('BG09', 'CZ07', 'EE10', 'ES07', 'HU08', 'LT08', 'LV05', 'PL10', 'RO15', 'SI04', 'SK06', 'CZ07', 'EE10', 'LV05', 'PL10', 'SI04')
) group by dpp_nuts, poper_nuts;
