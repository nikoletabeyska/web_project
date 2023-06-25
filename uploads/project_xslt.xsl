<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Каталог за исторически битки</h1>
                <table border="1">
                    <tr bgcolor="#123456">
                        <th style="text-align:justify"> Битка</th>
                        <th style="text-align:justify"> Тип на битката</th>
                        <th style="text-align:justify"> Период</th>
                        <th style="text-align:justify"> Причина за случването и</th>
                        <th style="text-align:justify"> Местоположение</th>
                        <th style="text-align:justify"> Начало</th>
                        <th style="text-align:justify"> Край</th>
                        <th style="text-align:justify"> Участващи страни</th>
                        <th style="text-align:justify"> Победител</th>
                    </tr>
                    <xsl:for-each select="catalog/battle">
                        <tr>
                            <td><xsl:value-of select="conflict/name"/></td>
                            <td><xsl:value-of select="@type"/></td>
                            <td><xsl:value-of select="conflict/period"/></td>
                            <td><xsl:value-of select="cause"/></td>
                            <td><xsl:value-of select="location"/></td>
                            <td><xsl:value-of select="start/date"/></td>
                            <td><xsl:value-of select="end/date"/></td>
                            a="";
                            <xsl:for-each select="catalog/battle/fighting_force">
                            a+=<xsl:value-of select="name"/>;
                            a+=" ";
                            </xsl:for-each>
                            <td>a</td>
                            <td><xsl:value-of select="result/winner"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>