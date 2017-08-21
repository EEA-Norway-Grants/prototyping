# Embedding data.eeagrants.org charts

Embedding a chart in another web page can be done by including the following `<script>` tag:

```
<div id="embedded">
  <script src="http(s)://<host>/embed/<scenario>/<component>.js?filter1=value1&filter2=value2" async></script>
</div>
```

The `<div>` tag is optional, but can be used to control layout and size. The script code automatically adds all elements in the parent element of the `<script>`.
Possible values:

1. host
  * eeagrants.edw.ro (development)
  * data.eeagrants.org (production)

2. scenario
  * index (Homepage)
  * grants (Our grants)
  * partners (Our partners)
  * projects (Our projects)

3. components (by scenario)
  * Homepage
    * overview
  * Our grants
    * mechanisms (the FM bar chart)
    * sectors (the PS/PA donut chart)
    * xmap (the map)
    * beneficiaries (the bar chart by beneficiary state)
    * xsummary (the blue/green text above the sidebar)
    * programmes (the list of programmes)
    * results (the list of results)
  * Our partners
    * mechanisms
    * sectors
    * xmap
    * donors (the bart chart by donor state)
    * beneficiaries
    * programme_partners (the table showing donor programme partners)
    * project_partners (the table showing donor project partners)
    * xsummary (number of donor programme/project partners)
    * results (list of results from the sidebar)
    * news (the list of news)
  * Our projects
    * mechanisms
    * sectors
    * xmap
    * beneficiaries
    * xsummary
    * news
    * projects (the list of projects from the sidebar)

4. Parameters for filtering: 

  * fm=
  * sector=
  * area=
  * donor=
  * beneficiary=
  * DPP=

The filtered values can be copied from the website when the filter is active.


Examples:

<a href="https://eea-norway-grants.github.io/prototyping/embed/homepage.html" target="_blank">Homepage</a>
```
<script src="https://eeagrants.edw.ro/embed/index/overview.js" async></script>
```

<a href="https://eea-norway-grants.github.io/prototyping/embed/project_map.html" target="_blank">Project map</a>
```
  <script src="https://eeagrants.edw.ro/embed/projects/xmap.js" async></script>
```

<a href="https://eea-norway-grants.github.io/prototyping/embed/fm.html" target="_blank">Funding by FM, filtered by country=RO</a>
```
  <script src="https://eeagrants.edw.ro/embed/grants/mechanisms.js?beneficiary=RO" async></script>
```

<a href="https://eea-norway-grants.github.io/prototyping/embed/partner_map.html" target="_blank">Partner map, filtered by donor programme partner=Norwegian Environment Agency (NEA)</a>
```
<script src="https://eeagrants.edw.ro/embed/partners/xmap.js?DPP=Norwegian+Environment+Agency+%28NEA%29" async></script>
```
